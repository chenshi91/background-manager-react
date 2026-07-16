import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import visualizer from 'rollup-plugin-visualizer'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 打包后自动生成分析页面
    visualizer({
      open: true,   // 打包完成自动打开浏览器
      filename: 'dist/stats.html', // 输出到 dist 目录，避免根目录生成文件
      template: 'treemap' // 按体积大小的矩形图，适合看模块大小；
    }),
    federation({
      name: 'host-app',
      // 主应用不需要暴露模块，remotes 是关键
      remotes: {
        // 这里要和你的 Remote 项目一一对应
        'remote-a': 'http://localhost:4173/remote-a/assets/remoteEntry.js'
      },
      // 和 Remote 项目保持一致的共享依赖
      shared: []
    })
  ],
  base: './',
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'], // 强制预构建你的库
    exclude: []
  },
  resolve: {
    // 确保扩展名能被解析
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  build: {
    // 改为 esnext，原生支持顶层 await
    target: 'esnext',
    // 联邦打包额外配置，规避兼容问题
    modulePreload: false,
    minify: true
  }
})
