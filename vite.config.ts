import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path"
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    mode,
    plugins: [
      react(),
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

    server: {
      proxy: {
        // '/api/': env.VITE_BASE_URL,
      },
    },

  })
}
