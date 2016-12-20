# html-demo-doc
自动执行代码示例的文档

## Getting Started

### 方法1

- 在 html 里面引入需要构建 api 的代码
- 按照 html 里面的说明编写文档

### 方法2

- 安装依赖

```shell
npm install html-demo-doc --save-dev
```

- 在要构建示例的代码中引用该组件:

```js
require('html-demo-doc');
```

- 参照 html-demo-doc 下的 webpack.config.js, webpack.dev.js 构建 webpack 工程。

- 构建自己的代码示例文档。

## Release History

 * 2016-12-20 v0.1.6 发布内容包含dist目录
 * 2016-12-19 v0.1.5 替换tip组件实现方案，修正显示了空白视图的问题
 * 2016-10-09 v0.1.1 添加 $logger 全局对象
 * 2016-10-09 v0.1.0 发布第一个正式版

