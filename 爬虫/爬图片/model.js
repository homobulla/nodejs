const rp = require("request-promise"), // 请求数据模块
    fs = require("fs"),           // 写入文件
    cheerio = require("cheerio"),  // 抓取页面模块
    depositPath = "E:\\node\\data\\img";  // 下载图片存放位置

let downloadPath; //下载图片的文件夹地址 ，若无则新建

module.exports =   {
    async getPage(url) {
        const data = {
            url,
            res: await rp({
                url: url
            })

        }
        return data
    },

    getUrl(data) {
        let list = [];
        const $ = cheerio.load(data.res);
        $('#pins li a').children().each(
            async (i,e) => {
                let obj = {
                    name: e.attribs.alt,
                    url: e.parent.attribs.href 
                }

                list.push(obj)
            }
        )
        return list;
    },
    getTitle(obj) {
        downloadPath = depositPath + obj.name;
        if (!fs.existsSync(downloadPath)) {//查看是否存在这个文件夹
            fs.mkdirSync(downloadPath);//不存在就建文件夹
            console.log(`${obj.name}文件夹创建成功`);
            return true;
        } else {
            console.log(`${obj.name}文件夹已经存在`);
            return false;
        }
      },
   
      getImagesNum(res, name) {
        if (res) {
          let $ = cheerio.load(res);
          let len = $(".pagenavi")
            .find("a")
            .find("span").length;
          if (len == 0) {
            fs.rmdirSync(`${depositPath}${name}`);//删除无法下载的文件夹
            return 0;
          }
          let pageIndex = $(".pagenavi")
            .find("a")
            .find("span")[len - 2].children[0].data;
          return pageIndex;//返回图片总数
        }
      },
    async downloadImage(data, index) {
        if (data.res) {
            var $ = cheerio.load(data.res);
            if ($(".main-image").find("img")[0]) {
                let imgSrc = $(".main-image").find("img")[0].attribs.src;//图片地址
                let headers = {
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
                "Cache-Control": "no-cache",
                Host: "i.meizitu.net",
                Pragma: "no-cache",
                "Proxy-Connection": "keep-alive",
                Referer: data.url,
                "Upgrade-Insecure-Requests": 1,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.19 Safari/537.36"
                };//反防盗链
                await rp({
                url: imgSrc,
                resolveWithFullResponse: true,
                headers
                }).pipe(fs.createWriteStream(`${downloadPath}/${index}.jpg`));//下载
                console.log(`${downloadPath}/${index}.jpg下载成功`);
            } else {
                console.log(`${downloadPath}/${index}.jpg加载失败`);
            }
        }
      }
}
