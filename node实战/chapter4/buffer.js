var buffer = Buffer.alloc(10);
console.log(buffer, Object.prototype.toString.call(buffer)); //<Buffer 00 00 00 00 00 00 00 00 00 00> '[object Uint8Array]'

// 字符长度&字节长度
let str = "ect…";
console.log(str.length, Buffer.byteLength(str)); // 4,6
