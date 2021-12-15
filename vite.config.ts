import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from "path"
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ]
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 自定义主题
        modifyVars: {
          // 'primary-color': 'red',
        }
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
})
