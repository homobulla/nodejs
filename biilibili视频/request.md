在服务端默认发送的数据是`utf8`编码格式，但浏览器在不知道服务器响应内容的情况下会采用系统默认的编码格式，而中文系统的默认编码格式是`gbk`.

在`node`中，可以通过设置`Content-Type`来设置编码格式。

```js
res.setHeader('Content-Type','text/plain;charset=utf-8');
```

同样的对于不同的资源类型，`Content-Type`会设置不同的属性来匹配。