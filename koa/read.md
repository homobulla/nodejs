koa
├── app.js
├── api
├── middleware
├── package.json
└── router
├── controller
└── test
└── view

### 项目文件说明
- app.js: 程序入口
- middleware: koa2相关中间件
- view 模板引擎 --已去除(updata 0711)
- api: api
- router: koa-router 路由
- test 接口单元测试 -> 一直有问题，难受
#### controller
> comment 基础数据处理 eg返回数据的格式以及返回接口数据

#### test
> mocha测试框架: http://mochajs.org/
> should断言库: https://github.com/tj/should.js
> supertest 接口集成测试
