const fs = require('fs');
const path = require('path');

class ProjectHealthCheck {
  constructor() {
    this.issues = [];
    this.stats = {
      components: 0,
      pages: 0,
      apis: 0,
      tests: 0
    };
  }

  scanProject() {
    console.log('🔍 Analisando saúde do projeto...\n');
    
    this.checkStructure();
    this.countFiles();
    this.checkDependencies();
    this.generateReport();
  }

  checkStructure() {
    const requiredDirs = [
      'src/app',
      'src/components', 
      'src/lib',
      'docs',
      'scripts',
      'tests'
    ];

    requiredDirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        this.issues.push(`❌ Diretório ausente: ${dir}`);
      } else {
        console.log(`✅ ${dir}`);
      }
    });
  }

  countFiles() {
    const countFiles = (dir, pattern) => {
      try {
        const files = fs.readdirSync(dir, { recursive: true });
        return files.filter(f => f.includes(pattern)).length;
      } catch {
        return 0;
      }
    };

    this.stats.components = countFiles('src/components', '.tsx');
    this.stats.pages = countFiles('src/app', 'page.tsx');
    this.stats.apis = countFiles('src/app/api', 'route.ts');
    this.stats.tests = countFiles('tests', '.test.');
  }

  checkDependencies() {
    try {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const deps = Object.keys(pkg.dependencies || {});
      const devDeps = Object.keys(pkg.devDependencies || {});
      
      console.log(`📦 Dependencies: ${deps.length}`);
      console.log(`🔧 Dev Dependencies: ${devDeps.length}`);
    } catch (error) {
      this.issues.push('❌ Erro ao ler package.json');
    }
  }

  generateReport() {
    console.log('\n📊 RELATÓRIO DE SAÚDE DO PROJETO');
    console.log('================================');
    
    console.log(`🏗️  Componentes: ${this.stats.components}`);
    console.log(`📄 Páginas: ${this.stats.pages}`); 
    console.log(`🔌 APIs: ${this.stats.apis}`);
    console.log(`🧪 Testes: ${this.stats.tests}`);
    
    if (this.issues.length > 0) {
      console.log('\n🚨 PROBLEMAS IDENTIFICADOS:');
      this.issues.forEach(issue => console.log(issue));
    } else {
      console.log('\n✅ Projeto em estado saudável!');
    }

    // Calcula score de saúde
    const score = this.calculateHealthScore();
    console.log(`\n🏆 SCORE DE SAÚDE: ${score}/100`);
  }

  calculateHealthScore() {
    let score = 100;
    
    // Penalidades
    if (this.stats.tests === 0) score -= 20;
    if (this.stats.apis < 3) score -= 10;
    if (this.issues.length > 0) score -= (this.issues.length * 5);
    
    return Math.max(0, score);
  }
}

// Executar análise
const healthCheck = new ProjectHealthCheck();
healthCheck.scanProject();
