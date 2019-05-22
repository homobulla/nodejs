const fs = require("fs");
const request = require("request");
const htmlparser = require("htmlparser"); // 数据转化
const configFileName = "./rss_feeds.txt";

// 检查源文件是否存在
function checkForSSRFile() {
    fs.exists(configFileName, function(exists) {
        if (!exists) {
            return next(new Error("Miss ssr file:" + configFileName));
        }
        next(null, configFileName);
    });
}
// 读取并解析包含订阅源的文件
function readRSSFile(configFileName) {
    fs.readFile(configFileName, function(err, feedList) {
        if (err) return next(err);
        feedList = feedList
            .toString()
            .replace(/^\s+|\s+$/g, "")
            .split("\n");
        let random = Math.floor(Math.random() * feedList.length);
        // console.log();
        if (!feedList.toString()) throw "no rss url";
        next(null, feedList[random]);
    });
}

// 发送请求获取数据
function downloadRSSFeed(feedUrl) {
    request({ url: feedUrl }, function(err, res, body) {
        if (err) return next(err);
        if (res.statusCode != 200) {
            return next(new Error("network err"));
        }

        next(null, body);
    });
}

//将源数据解析到一个条目数组中
function parserRSSFeed(rss) {
    //任务4: 将预定源数据解析到一个条目数组中
    var handler = new htmlparser.RssHandler();
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);
    if (!handler.dom.items.length) {
        return next(new Error("No RSS items found"));
    }

    //如果有数据, 显示第一个预定源条目的标题和URL
    var item = handler.dom.items.shift();
    console.log("title: " + item.title);
    console.log("link: " + item.link);
}

let tasks = [checkForSSRFile, readRSSFile, downloadRSSFeed, parserRSSFeed];
function next(err, result) {
    if (err) throw err;
    let currentTask = tasks.shift();
    if (currentTask) {
        currentTask(result);
    }
}
next();
