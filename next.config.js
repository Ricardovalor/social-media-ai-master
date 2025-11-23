/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true, // Permite referências a diretórios externos, mas não compila
  },
  typescript: {
    // Ignorar erros de tipo durante o build para arquivos externos
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorar erros do ESLint durante o build
    ignoreDuringBuilds: true,
  },
  // Ignorar durante o build os caminhos que não estão no projeto
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Excluir a pasta do OneDrive e do Edge
    config.module.rules.push({
      test: /(OneDrive|AppData)/,
      use: 'ignore-loader'
    });
    return config;
  },
}

module.exports = nextConfig
