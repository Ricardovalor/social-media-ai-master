const fs = require('fs');

console.log('🔍 VERIFICAÇÃO FINAL DA PLATAFORMA\n');

// Verificar arquivos críticos
const criticalFiles = [
  'src/components/ui/input.tsx',
  'src/lib/utils.ts',
  'src/app/layout.tsx',
  'src/app/login/page.tsx',
  'package.json'
];

let allExist = true;

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - AUSENTE`);
    allExist = false;
  }
});

console.log('\n📦 VERIFICANDO DEPENDÊNCIAS...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const deps = ['clsx', 'tailwind-merge'];
deps.forEach(dep => {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    console.log(`✅ ${dep} - Instalada`);
  } else {
    console.log(`❌ ${dep} - NÃO INSTALADA`);
    allExist = false;
  }
});

if (allExist) {
  console.log('\n🎉 PLATAFORMA PRONTA PARA DEPLOY!');
  console.log('🌐 URL: https://spectacular-queijadas-08c671.netlify.app');
} else {
  console.log('\n⚠️  Alguns componentes precisam ser corrigidos');
}
