module.exports = function(output) {
    return {
        replaceConsole: true,
        appenders: {
            cheese: {
                type: "dateFile",

                filename: "logs/" + output,

                encoding: "utf-8",

                layout: {
                    type: "pattern",

                    pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
                },

                pattern: "-yyyy-MM-dd",

                keepFileExt: true,

                alwaysIncludePattern: true
            }
        },
        categories: {
            default: { appenders: ["cheese"], level: "debug" }
        }
    };
};
