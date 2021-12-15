# react-template

使用vite2.x搭建react开发环境。

## 技术点

- vite@2.x
- react@17.x
- typescript@4.x
- antd@4.x
- react-router-dom@6.x
- axios



下载个插件时，同时也下载下他的类型文件

比如 react-router-dom 的

npm i @types/react-router-dom -D

## 说明

### 初始化项目

vite文档

### 更换vite处理react的插件

初始化项目里是使用的'@vitejs/plugin-react'，这个插件的 @vitejs/plugin-react-refresh

npm i @vitejs/plugin-react-refresh -D

### alias

 npm i @types/node -D

```javascript
import { defineConfig } from 'vite'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
})
```

tsconfig.json

```json
{
  "compilerOptions": {
    "types": [
      "node"
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```





### antd

#### 下载

npm i antd @ant-design/icons -S

#### 解决css的按需

ant js本身就支持tree shaking

使用vite-plugin-style-import插件，还需要 npm i less -D

```javascript
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    // ...
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
        javascriptEnabled: true,
      },
    },
  },
})
```

此处缺个东西，使用前后css的包大小对比。

#### 自定义ant主题

https://ant.design/docs/react/customize-theme-cn

```javascript
import styleImport from 'vite-plugin-style-import'

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 自定义主题
        modifyVars: {
          'primary-color': 'red',
        }
      },
    },
  },
})
```





### react-router-dom

使用的6.x版本，和5.x的版本区别有些大

https://reactrouter.com/docs/en/v6/getting-started/installation

- [x] base路由
- [x] notfound
- [x] layout
- [x] 路由懒加载
- [ ] 路由懒加载，定义打包后路由名字，就如webpack的 ``/* webpackChunkName: "home" */``
- [ ] 打包后的文件未分文件夹的问题



问题：

1. 我下载了@types/react-router-dom，打包会报类型错误，因为types都打包到react-router-dom@6中了。卸载该types即可。issues https://github.com/remix-run/react-router/issues/8155



## 图片类资源



## 环境变量





## 搭建遇到的问题

- vite工程中，引入一个新包，就不能热更新了，存在问题，待解决，比如引入？？。
- vite.config.js修改就需要重新启动的问题。

## 参考资料

- https://github.com/vitejs/awesome-vite#templates



https://juejin.cn/post/6989475484551610381

```js





```





