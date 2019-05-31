/**
 * connect.logger已经去除，以下为log4.js模块的使用
 * url: https://juejin.im/post/57b962af7db2a200542a0fb3
 */

// const log4js = require("log4js");
// log4js.configure({
//     appenders: { cheese: { type: "DateFile", filename: "cheese.log" } },
//     categories: { default: { appenders: ["cheese"], level: "error" } }
// });

// const logger = log4js.getLogger("logger.js");
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");

const log4js = require("log4js");
let config = require("./log4.configure");
log4js.configure(config("error/error.log"));

const logger = log4js.getLogger();
logger.info("info");
