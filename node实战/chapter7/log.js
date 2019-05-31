const log4js = require("log4js");
let config = require("./log4.configure");
log4js.configure(config("congif/con.log"));
const logger = log4js.getLogger();
logger.info("info");
