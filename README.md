## Base UI 开发指南

一个注释比代码还多的不上生产的练习UI库

**css预处理器使用less**
**组件使用hooks写法**

### peerDependences
对vue的依赖版本 >=3.0.0

### webpack 基本配置
+ 处理less
+ 不对第三方包进行打包, 减少UI库体积
+ 对文件进行压缩 optimization.minimizer -> uglifyjs-webpack-plugin

