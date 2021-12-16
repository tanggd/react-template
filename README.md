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

错误操作，哈哈哈

初始化项目里是使用的'@vitejs/plugin-react'，这个插件的 @vitejs/plugin-react-refresh

npm i @vitejs/plugin-react-refresh -D

npm i @vitejs/plugin-react -D

注意：更换回去，更换到@vitejs/plugin-react，测试是不是每个tsx/jsx中都需要import react from 'react'

区别：

@vitejs/plugin-react-refresh：每个jsx、tsx文件中都需要import React from 'react'，不管是否使用React；

@vitejs/plugin-react：就可以避免上面的问题。

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

也可以使用插件 vite-plugin-imp https://github.com/onebay/vite-plugin-imp

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

https://cn.vitejs.dev/guide/env-and-mode.html

### package.json中的配置

```json
"scripts": {
    "dev": "vite",
    "dev2": "vite --mode development",
    "dev:test": "vite --mode test",
    "dev:prod": "vite --mode production",
    "build": "tsc && vite build",
    "build:dev": "tsc && vite build --mode development",
    "build:test": "tsc && vite build --mode test",
    "build:prod": "tsc && vite build --mode production",
    "preview": "vite preview"
},
```

### 使用

`--mode` 后的值，代表的是环境变量值；项目中使用

```javascript
console.log(import.meta.env)
/**

{
  BASE_URL: "/",
  DEV: true,
  MODE: "development",
  PROD: false,
  SSR: false,
}
 */
const { MODE } = import.meta.env
console.log(MODE)  // development
```

- **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://cn.vitejs.dev/guide/env-and-mode.html#modes)。
- **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://cn.vitejs.dev/config/#base)决定。
- **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境。
- **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。

### vite.config.ts中使用

vite.config.ts（vite.config.js）中获取mode，export default一个函数，这个函数的会带一个参数，这个参数中便有mode和command的值。mode值就是--mode后的值；command就是serve和build，npm run dev时是serve，npm run build时是build；

```javascript
export default ({ mode, command }) => {
  return defineConfig({
    mode: mode,
    // ...
  })
}
```

### .env文件

```bash
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

我们按照 .env.[mode] 新建3个环境的环境文件

.env文件

```bash
# 系统名称
VITE_APP_TITLE=系统名称-env
```

.env.development文件

```bash
# 系统名称
VITE_APP_TITLE=系统名称-development
```

.env.test文件

```bash
# 系统名称
VITE_APP_TITLE=系统名称-test
```

.env.production文件

```bash
# 系统名称
VITE_APP_TITLE=系统名称-production
```

在不同环境下，分别打印测试

```javascript
console.log(import.meta.env.VITE_APP_TITLE) // ...
```

打印说明：如果只创建了.env文件，打印的便是.env文件的值；创建各环境的.env.[mode]   文件，VITE_APP_TITLE会优先读取对应环境的.env.[mode] 变量，获取到值就用自己环境的，获取不到就使用.env的。

注意：只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码

### 类型定义

类型定义是为了在写`import.meta.env.xxx` 提供了智能提示。

 [`vite/client.d.ts`](https://github.com/vitejs/vite/blob/main/packages/vite/client.d.ts) 中定义类型

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 在入口文件index.html中使用

待解决



## 接口代理

vite.config.ts

```javascript
import { defineConfig, loadEnv } from 'vite'

export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    mode,
    server: {
      proxy: {
        '/api/': env.VITE_BASE_URL,
      },
    },
  })
}
```







## 搭建遇到的问题

- vite工程中，引入一个新包，就不能热更新了，存在问题，待解决，比如引入？？。
- vite.config.js修改就需要重新启动的问题。

## 参考资料

- https://github.com/vitejs/awesome-vite#templates



https://juejin.cn/post/6989475484551610381

```js





```





