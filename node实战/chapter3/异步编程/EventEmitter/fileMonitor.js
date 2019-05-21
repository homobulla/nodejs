/*
 * Created by homobulla on 19/05/17.
 * 扩展事件监听器：文件监听器
 * 1.创建类的构造器
 * 2. 继承事件发射器的行为
 * 3. 扩展这些行为
 */

// Watcher 类的构造器
/*
	watchDir {Strnig} 监控的文件
	processDir {Strnig} 放置修改过的文件目录
*/
function Watcher(watchDir, processDir) {
    this.watchDir = watchDir;
    this.processDir = processDir;
}
// 事件发射器行为
let events = require("events"),
    util = require("util");
util.inherits(Watcher, events.EventEmitter);

// 扩展事件功能
let fs = require("fs"),
    watchDir = "./watch",
    processDir = "./down";
Watcher.prototype.watch = function() {
    var watcher = this;
    fs.readdir(this.watchDir, function(err, files) {
        if (err) throw err;
        //处理watch目录中的所有文件
        for (var index in files) {
            watcher.emit("process", files[index]);
        }
    });
};

Watcher.prototype.start = function() {
    var watcher = this;
    fs.watchFile(watchDir, function() {
        watcher.watch();
    });
};

// 创建实类
let watcher = new Watcher(watchDir, processDir);

watcher.on("process", function(file) {
    var watchFile = this.watchDir + "/" + file;
    var processFile = this.processDir + "/" + file.toLowerCase();
    console.log(watchDir, processDir);
    // fs.rename(watchFile, processFile, function(err) {
    //     if (err) {
    //         console.log("err:" + err);
    //     }
    // });
});

watcher.start();
