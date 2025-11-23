const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando integridade do projeto...');

const requiredFiles = [
  'src/App.tsx',
  'src/types.ts',
  'src/components/dashboard/StatsGrid.tsx',
  'src/components/dashboard/RecentPosts.tsx',
  'src/components/dashboard/SchedulePost.tsx',
  'src/components/analytics/AnalyticsChart.tsx',
  'src/components/ai/AIGenerator.tsx',
  'src/hooks/useAIGenerator.ts',
  'package.json',
  'vite.config.ts'
];

let allGood = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    if (stats.size > 100) {
      console.log(`✅ ${file} (${stats.size} bytes)`);
    } else {
      console.log(`⚠️  ${file} - Arquivo muito pequeno (${stats.size} bytes)`);
      allGood = false;
    }
  } else {
    console.log(`❌ ${file} - Arquivo não encontrado`);
    allGood = false;
  }
});

if (allGood) {
  console.log('🎉 Todos os arquivos estão íntegros!');
} else {
  console.log('💡 Alguns arquivos precisam de atenção.');
}
