
const superagent = require('superagent');
const express = require('express');
const cheerio = require('cheerio');
var app = express();

app.get('/', function (req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://cnodejs.org/')
      .end(function (err, sres) {
        // 常规的错误处理
        if (err) {
          return next(err);
        }
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
        var $ = cheerio.load(sres.text);
        var items = [];
        // $('#topic_list .topic_title').each(function (idx, element) {
        //   var $element = $(element);
        //   items.push({
        //     title: $element.attr('title'),
        //     href: `https://cnodejs.org${$element.attr('href')}`,
        //   });
        // });
        $('.cell').each(function (idx, element) {
            var $el = $(element).find('.user_avatar img');
            var $con = $(element).find('.topic_title');
            var $click = $(element).find('.count_of_visits');
            var $repeat = $(element).find('.count_of_replies')
            

            items.push({
              title: $con.attr('title'),
              link: `https://cnodejs.org${$con.attr('href')}`,
              author: $el.attr('title'),
              repeat: $repeat.text().replace(/[\r\n]/g,""),
              click: $click.text().replace(/[\r\n]/g,"")
            });
          });
        res.send(items);
      });
  });

  app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
  });