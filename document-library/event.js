let events = require("events");
let fs = require("fs");
let EventEmitter = new events.EventEmitter();
(function() {
    fs.readFile("README.md", (err, data) => {
        EventEmitter.emit("data", data.toString());
    });
})();
EventEmitter.on("data", ext => {
    console.log("ext:" + ext);
});
