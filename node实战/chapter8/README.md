## Express

全局安装`express`后，还需要全局安装对应的生成器`express-generator`（4.x 版本将其抽离出来了）

`express -e`会生成一个程序骨架，`-e`表示的是使用的模板引擎`ejs`,默认使用的是`jade`

### express 生成的默认配置

#### 基于环境的配置

用`process.env.NODE_ENV`或直接`app.get('env')`来获取当前的环境，而环境设置直接在命令行后追加比如`-prod`则为生成环境。
