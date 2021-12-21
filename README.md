# react-template

使用 vite2.x 搭建 react 开发环境。

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

vite 文档

认识命令界面

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

### 更换 vite 处理 react 的插件

错误操作，哈哈哈

初始化项目里是使用的'@vitejs/plugin-react'，这个插件的 @vitejs/plugin-react-refresh

npm i @vitejs/plugin-react-refresh -D

npm i @vitejs/plugin-react -D

注意：更换回去，更换到@vitejs/plugin-react，测试是不是每个 tsx/jsx 中都需要 import react from 'react'

区别：

@vitejs/plugin-react-refresh：每个 jsx、tsx 文件中都需要 import React from 'react'，不管是否使用 React；

@vitejs/plugin-react：就可以避免上面的问题。

### 打包文件分目录

vite 打包后，js、css、图片等资源都在 assets 目录下；

如果有需要分目录，可以参考 https://github.com/vitejs/vite/issues/3815

```javascript
export default defineConfig({
  build: {
    assetsDir: 'static/img/',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
```

我觉得多数情况下是没有必要分目录的。

### 是否计算打包大小

```javascript
export default defineConfig({
  build: {
    brotliSize: false,
  },
})
```

### 打包自定义 chunkname

像 webpack 中 webpackChunkName 那样支持自定义 chunkname

vite 中暂无方法

### public 目录

- 放在`public`目录下的文件应使用绝对路径引用，例如`public/favicon.svg`应该使用`/favicon.svg`
- `public`中的资源不应该被`JavaScript`文件引用

### alias

npm i @types/node -D

```javascript
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
```

tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["node"],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 兼容性

vite 打包使用 rollup，最低 es2015.

需要更低的版本，需要 @vitejs/plugin-legacy

https://github.com/vitejs/vite/tree/main/packages/plugin-legacy

### antd

#### 下载

npm i antd @ant-design/icons -S

#### 解决 css 的按需

ant js 本身就支持 tree shaking

使用 vite-plugin-style-import 插件，还需要 npm i less -D

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
            return `antd/es/${name}/style/index`
          },
        },
      ],
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

此处缺个东西，使用前后 css 的包大小对比。

也可以使用插件 vite-plugin-imp https://github.com/onebay/vite-plugin-imp

#### 自定义 ant 主题

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
        },
      },
    },
  },
})
```

### react-router-dom

使用的 6.x 版本，和 5.x 的版本区别有些大

https://reactrouter.com/docs/en/v6/getting-started/installation

- [x] base 路由
- [x] notfound
- [x] layout
- [x] 路由懒加载
- [ ] 路由懒加载，定义打包后路由名字，就如 webpack 的 `/* webpackChunkName: "home" */`
- [ ] 打包后的文件未分文件夹的问题

组件：

BrowserRouter

HashRouter

Routes

Route

Link

NavLink

Outlet

一些方法：

useNavigate

useSearchParams

```
let [searchParams, setSearchParams] = useSearchParams()
```

太多了，看文档

问题：

1. 我下载了@types/react-router-dom，打包会报类型错误，因为 types 都打包到 react-router-dom@6 中了。卸载该 types 即可。issues https://github.com/remix-run/react-router/issues/8155

### 图片类资源

### 环境变量

https://cn.vitejs.dev/guide/env-and-mode.html

#### package.json 中的配置

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

#### 使用

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
console.log(MODE) // development
```

- **`import.meta.env.MODE`**: {string} 应用运行的[模式](https://cn.vitejs.dev/guide/env-and-mode.html#modes)。
- **`import.meta.env.BASE_URL`**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://cn.vitejs.dev/config/#base)决定。
- **`import.meta.env.PROD`**: {boolean} 应用是否运行在生产环境。
- **`import.meta.env.DEV`**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。

#### vite.config.ts 中使用

vite.config.ts（vite.config.js）中获取 mode，export default 一个函数，这个函数的会带一个参数，这个参数中便有 mode 和 command 的值。mode 值就是--mode 后的值；command 就是 serve 和 build，npm run dev 时是 serve，npm run build 时是 build；使用 command 做判断，分别配置各环境的独有配置。

```javascript
export default ({ mode, command }) => {
  return defineConfig({
    mode: mode,
    // ...
  })
}
```

.env 文件中的变量在 vite.config.ts 中的使用

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

#### .env 文件

```bash
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

我们按照 .env.[mode] 新建 3 个环境的环境文件

.env 文件

```bash
# 系统名称
VITE_APP_TITLE=系统名称-env
```

.env.development 文件

```bash
# 系统名称
VITE_APP_TITLE=系统名称-development
```

.env.test 文件

```bash
# 系统名称
VITE_APP_TITLE=系统名称-test
```

.env.production 文件

```bash
# 系统名称
VITE_APP_TITLE=系统名称-production
```

在不同环境下，分别打印测试

```javascript
console.log(import.meta.env.VITE_APP_TITLE) // ...
```

打印说明：如果只创建了.env 文件，打印的便是.env 文件的值；创建各环境的.env.[mode] 文件，VITE_APP_TITLE 会优先读取对应环境的.env.[mode] 变量，获取到值就用自己环境的，获取不到就使用.env 的。

注意：只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。读取所有`VITE_`前缀作为应用变量存放在 `import.meta.env` 上。

#### 类型定义

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

#### 在入口文件 index.html 中使用

npm i vite-plugin-html -D

https://github.com/anncwb/vite-plugin-html

```javascript
import { defineConfig, loadEnv } from 'vite'
import { minifyHtml, injectHtml } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    mode,
    plugins: [
      // ...
      minifyHtml(), // 打包可以压缩index.html
      injectHtml({
        data: {
          // 可以直接解构env，或者赋值
          ...env,
        },
      }),
      // ...
    ],
  })
}
```

在 index.html 中使用，使用 EJS 语法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%- VITE_APP_TITLE %></title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

插件其他用法见链接，如

### axios

### 接口代理

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

## 规范

### ESLint + Prettier

ESLint：规范代码（）

Prettier：格式化代码

```bash
npm i eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-prettier prettier -D
npm i eslint-define-config -D
# eslint-define-config 提供配置项的良好提示

npm i eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks -D

npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser -D

npm i eslint-plugin-import eslint-plugin-simple-import-sort -D

eslint-plugin-jest
```

新建.eslintignore 文件

```bash
typings
lib/**/*
node_modules
dist
**/*.d.ts
vite.config.ts
```

新建.eslintrc.js；添加规则，请更新`.eslintrc.(yml|json|js)`：

```bash

```

新建 .prettierignore

```bash

```

新建 prettier.config.js

```javascript

```

配置 scripts

```json
{
  "scripts": {
    "lint:script": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint-fix:script": "npm run lint:script -- --fix"
  }
}
```

npm run lint:script 即可查看 lint 出来的不规范的代码。

npm run lint-fix:script 即可格式化文件。

### stylelint

https://zhuanlan.zhihu.com/p/138323526

对 css 规范化和格式化

```bash
npm i -D stylelint stylelint-config-prettier stylelint-config-standard stylelint-order stylelint-config-rational-order stylelint-declaration-block-no-ignored-properties
```

新建 .stylelintignore

```bash

```

新建 .stylelintrc.js

```javascript

```

配置 scripts

```javascript
"scripts": {
    "lint:script": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:style": "stylelint \"**/*.{less,postcss,css,scss}\"",
    "lint-fix:script": "npm run lint:script -- --fix",
    "lint-fix:style": "npm run lint:style -- --fix",
    "lint-fix": "npm run lint-fix:script && npm run lint-fix:style",
    "lint": "npm run tsc && npm run lint-fix",
    "tsc": "tsc --noEmit"
},
```

### Husky + Lint-staged

commit 规范化

commit 前对代码进行代码检测（eslint、stylelint)，检测通过就格式化代码(eslint --fix、stylelint --fix)，若检测未通过，则终止 commit

使用 Git Hook 便可达到目的。

#### Husky

husky —— Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令。

```bash
npx husky-init
```

命令做了 3 件事

1. 在 package.json 中添加开发依赖 husky，此时的 husky 未下载，需要执行 npm install
2. 并增加 scripts 配置"prepare": "husky install"
3. 创建`.husky` 目录，在目录下创建文件

```bash
.husky
├── pre-commit
└── _
    ├── .gitignore
    └── husky.sh
```

修改 pre-commit 文件

```bash

```

至此，存在一个问题，我们只是修改了一两个文件，却要对所有文件进行 eslint --fix。如果别的提交者强制提交了不符合规范的代码，那别人负责的文件也会被我们修改掉。此时需要我们使用工具 Lint-staged

#### Lint-staged

lint-staged —— 在 git 暂存的文件上运行 lint.

npm i lint-staged -D

## TailwindCSS v3.0

## 其他

- 如果你的本地开发环境需要其他人在局域网下能够访问，可以在 package.json 里配置参数--host

```json
{
  "scripts": {
    "dev": "vite --host"
  }
}
```

## 搭建遇到的问题

- vite 工程中，引入一个新包，就不能热更新了，存在问题，待解决，比如引入？？。
- vite.config.js 修改就需要重新启动的问题。

## 参考资料

- https://github.com/vitejs/awesome-vite#templates

https://juejin.cn/post/6989475484551610381

https://juejin.cn/post/7028137821269393438

```js

```

目录结构生成

```
npm i tree-node-cli -g
```

treee -L 4 -I "node_modules|dist|src" -a > a.md
