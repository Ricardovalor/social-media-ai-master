<#
    cleanup_windows.ps1
    Uso: Execute como Administrador para ações completas.
    Exemplo de DryRun:
      .\cleanup_windows.ps1 -DryRun
#>

param(
    [switch]$DryRun = $false,
    [int]$DaysThreshold = 30,
    [string[]]$PathsToProtect = @(
        "$env:USERPROFILE\Desktop",
        "$env:USERPROFILE\Documents",
        "$env:USERPROFILE\OneDrive",
        "$env:USERPROFILE\Pictures",
        "$env:USERPROFILE\Videos",
        "$env:USERPROFILE\OneDrive\Área de Trabalho\Projetos",
        "$env:USERPROFILE\OneDrive\Área de Trabalho"
    ),
    [string[]]$RepoRoots = @(
        "$env:USERPROFILE\OneDrive\Área de Trabalho",
        "$env:USERPROFILE\OneDrive\Área de Trabalho\Projetos",
        "$env:USERPROFILE\Repos"
    ),
    [string]$LogPath = "$env:USERPROFILE\cleanup_windows_log.txt"
)

function Write-Log {
    param($m)
    $ts = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    "$ts`t$m" | Out-File -FilePath $LogPath -Append -Encoding utf8
    Write-Output $m
}

function Ensure-Admin {
    $isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
    if (-not $isAdmin) {
        Write-Output "Pedindo elevação (abrindo nova janela do PowerShell como Administrador)..."
        Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
        exit
    }
}

function Is-ProtectedPath {
    param($path)
    foreach ($p in $PathsToProtect) {
        if ($null -ne $p -and $path -like "$p*") { return $true }
    }
    return $false
}

function Create-RestorePoint {
    try {
        Write-Log "Tentando criar ponto de restauração 'Pre-Cleanup'..."
        if ($DryRun) { Write-Log "[DRYRUN] Ponto de restauração não criado (DryRun)"; return }
        if (Get-Command -Name Checkpoint-Computer -ErrorAction SilentlyContinue) {
            Checkpoint-Computer -Description "Pre-Cleanup" -RestorePointType "MODIFY_SETTINGS" -ErrorAction Stop
            Write-Log "Ponto de restauração criado."
        } else {
            Write-Log "Checkpoint-Computer não disponível nesta sessão — pular criação de ponto."
        }
    } catch {
        Write-Log ("Não foi possível criar ponto de restauração: " + $_.Exception.Message)
    }
}

function Remove-OldFiles {
    param($Path)
    if (Is-ProtectedPath $Path) { Write-Log ("Pular limpeza (protegido): " + $Path); return }
    Write-Log ("Scanning: " + $Path)
    try {
        $cutoff = (Get-Date).AddDays(-$DaysThreshold)
        $items = Get-ChildItem -Path $Path -Force -Recurse -ErrorAction SilentlyContinue | Where-Object {
            -not $_.PSIsContainer -and ($_.LastWriteTime -lt $cutoff)
        }
        foreach ($f in $items) {
            $isSafe = $true
            foreach ($p in $PathsToProtect) { if ($f.FullName -like "$p*") { $isSafe = $false; break } }
            if (-not $isSafe) { continue }
            if ($DryRun) { Write-Log ("[DRYRUN] Arquivo a remover: " + $f.FullName) }
            else {
                try {
                    Remove-Item -LiteralPath $f.FullName -Force -ErrorAction Stop
                    Write-Log ("Removido: " + $f.FullName)
                } catch {
                    Write-Log ("Falha ao remover " + $f.FullName + ": " + $_.Exception.Message)
                }
            }
        }
    } catch {
        Write-Log ("Erro Remove-OldFiles em " + $Path + ": " + $_.Exception.Message)
    }
}

function Clear-Temps {
    Write-Log "=== Limpando temporários ==="
    $paths = @("$env:TEMP", "$env:LOCALAPPDATA\Temp", "C:\Windows\Temp")
    foreach ($p in $paths) {
        if (Test-Path $p) {
            if (Is-ProtectedPath $p) { Write-Log ("Pular (protegido): " + $p); continue }
            Write-Log ("Limpando: " + $p)
            Remove-OldFiles -Path $p
        } else {
            Write-Log ("Não existe: " + $p)
        }
    }
}

function Clear-WindowsUpdateCache {
    Write-Log "=== Limpando cache do Windows Update (SoftwareDistribution) ==="
    $sd = "C:\Windows\SoftwareDistribution"
    $cat = "C:\Windows\System32\catroot2"
    if ($DryRun) { Write-Log "[DRYRUN] Não será renomeado SoftwareDistribution nem Catroot2 (DryRun)"; return }
    try {
        Write-Log "Parando serviços wuauserv e bits..."
        Stop-Service wuauserv -Force -ErrorAction SilentlyContinue
        Stop-Service bits -Force -ErrorAction SilentlyContinue
        Stop-Service cryptsvc -Force -ErrorAction SilentlyContinue

        if (Test-Path $sd) {
            # calcula timestamp Unix inteiro de forma segura (sem problemas de locale/decimal)
            $unix = [int]((Get-Date).ToUniversalTime() - [datetime]'1970-01-01').TotalSeconds
            $new = "$sd.old.$unix"
            Rename-Item -Path $sd -NewName $new -ErrorAction SilentlyContinue
            Write-Log ("SoftwareDistribution renomeado para " + $new)
        }
        if (Test-Path $cat) {
            $unix2 = [int]((Get-Date).ToUniversalTime() - [datetime]'1970-01-01').TotalSeconds
            $newc = "$cat.old.$unix2"
            Rename-Item -Path $cat -NewName $newc -ErrorAction SilentlyContinue
            Write-Log ("catroot2 renomeado para " + $newc)
        }
    } catch {
        Write-Log ("Falha ao limpar cache do Windows Update: " + $_.Exception.Message)
    } finally {
        Start-Service wuauserv -ErrorAction SilentlyContinue
        Start-Service bits -ErrorAction SilentlyContinue
        Start-Service cryptsvc -ErrorAction SilentlyContinue
        Write-Log "Serviços reiniciados."
    }
}

function Run-SFC-DISM {
    Write-Log "=== Executando SFC e DISM ==="
    if ($DryRun) { Write-Log "[DRYRUN] SFC/DISM não executados (DryRun)"; return }
    try {
        Write-Log "Iniciando: sfc /scannow"
        sfc /scannow | Out-String | ForEach-Object { Write-Log $_ }
        Write-Log "Iniciando: DISM /Online /Cleanup-Image /RestoreHealth"
        DISM.exe /Online /Cleanup-Image /RestoreHealth | Out-String | ForEach-Object { Write-Log $_ }
    } catch {
        Write-Log ("Erro SFC/DISM: " + $_.Exception.Message)
    }
}

function Run-QuickSystemChecks {
    Write-Log "=== Verificações rápidas do sistema ==="
    try {
        Write-Log "Serviços parados recentemente (top 10):"
        Get-Service | Where-Object {$_.Status -eq 'Stopped'} | Select-Object -First 10 | Out-String | ForEach-Object { Write-Log $_ }

        Write-Log "Top 20 processos por memória:"
        Get-Process | Sort-Object -Descending WS | Select-Object -First 20 | Out-String | ForEach-Object { Write-Log $_ }

        Write-Log "Erros recentes no log do Sistema (últimos 50):"
        if (Get-Command -Name Get-EventLog -ErrorAction SilentlyContinue) {
            Get-EventLog -LogName System -EntryType Error -Newest 50 | Out-String | ForEach-Object { Write-Log $_ }
        } else {
            Get-WinEvent -FilterHashtable @{LogName='System'; Level=2} -MaxEvents 50 | Out-String | ForEach-Object { Write-Log $_ }
        }
    } catch {
        Write-Log ("Erro em checagens rápidas: " + $_.Exception.Message)
    }
}

function Clean-GitRepos {
    param([string[]]$roots)
    Write-Log ("=== Limpando repositórios Git (gc) nas raízes: " + ($roots -join ', ') + " ===")
    foreach ($r in $roots) {
        if (-not (Test-Path $r)) { Write-Log ("Raiz não existe: " + $r); continue }
        $repos = Get-ChildItem -Path $r -Directory -Recurse -Force -ErrorAction SilentlyContinue | Where-Object {
            Test-Path (Join-Path $_.FullName ".git")
        }
        foreach ($repo in $repos) {
            $d = $repo.FullName
            Write-Log ("Encontrado repo: " + $d)
            if ($DryRun) {
                Write-Log ("[DRYRUN] git -C " + $d + " reflog expire --expire=now --all")
                Write-Log ("[DRYRUN] git -C " + $d + " gc --prune=now")
                continue
            }
            try {
                Push-Location $d
                if (Get-Command git -ErrorAction SilentlyContinue) {
                    $out1 = & git -C "$d" reflog expire --expire=now --all 2>&1
                    foreach ($l in $out1) { Write-Log $l }
                    $out2 = & git -C "$d" gc --prune=now 2>&1
                    foreach ($l in $out2) { Write-Log $l }
                } else {
                    Write-Log ("git não encontrado no PATH — pular " + $d)
                }
            } catch {
                Write-Log ("Erro git em " + $d + ": " + $_.Exception.Message)
            } finally {
                Pop-Location
            }
        }
    }
}

# === Execução ===
Write-Log "=== Cleanup iniciado ==="
if (-not $DryRun) { Ensure-Admin }
Create-RestorePoint
Clear-Temps
Clear-WindowsUpdateCache
Run-SFC-DISM
Run-QuickSystemChecks
Clean-GitRepos -roots $RepoRoots
Write-Log "=== Cleanup finalizado ==="
Write-Output ("Fim. Log salvo em " + $LogPath)