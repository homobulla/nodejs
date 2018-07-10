const rp = require("request-promise"), // 请求数据模块
    fs = require("fs"),           // 写入文件
    cheerio = require("cheerio"),  // 抓取页面模块
    depositPath = "E:\\node\\data\\img",  // 下载图片存放位置
    URL = 'https://juejin.im/welcome/frontend'; // 请求url
let downloadPath; //下载图片的文件夹地址 ，若无则新建


class Spider {
    constructor(title,likeBtn,commentBtn) {
        this.title = title;
        this.likeBtn = likeBtn;
        this.commentBtn = commentBtn;
        
    }

    
}
