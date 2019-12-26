# mall
## 项目启动
### 1.**下载依赖**
npm i
### 2.首先**启动数据库**
- 打开命令窗口，输入mongod --dbpath d:\MongoDB\data (本机中mongodb数据文件存放的地方)
- 再打开一个窗口，输入 mongo
### 3.**后台启动**
在项目文件夹的终端中，输入 node server/bin/www
### 4.**启动项目**
再打开一个项目的终端，输入 npm run dev
## 目录介绍
- build : webpack配置文件
- config : 项目配置
- mock : 存放假数据，测试用
- node_modules : 依赖文件
- server : 后台文件
  - bin/www : 项目启动文件
  - models : 存放数据库文件
  - public : 静态文件，css、js等
  - routes : 路由文件
  - util : 工具文件
  - views : 页面模板文件
  - app.js : 主入口文件
- src : 项目源码及需要引用的资源文件
  - assets : 资源(会被webpack处理)
  - components :组件
  - router : 路由配置文件
  - util : 工具文件
  - views : 页面
  - App.vue : 主应用程序组件
  - main.js : 应用入口文件
- static : 静态资源文件
- .babelrc : babel配置
- .editorconfig : editor配置
- .postcssrc.js : postcss配置
- index.html : index.html模板，用于挂载vue节点
- package-lock.json : 锁定安装时的依赖版本号
- package.json : 脚本和依赖关系
- README.md : 项目介绍

