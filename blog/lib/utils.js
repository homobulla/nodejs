const log4js = require("log4js");
const logger = log4js.getLogger("cheese");

log4js.configure({
    appenders: { cheese: { type: "file", filename: "cheese.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});

module.exports = {
    logger
};
