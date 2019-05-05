`ip`地址用来定位计算机，端口号用来定位具体的应用程序。（所有需要通信的软件都必须要端口号）

端口号的范围是从0 - 65536。

在`node`中，可以通过`req.socket.remoteAddress、req.socket.remotePort`来获取对用的`ip`和端口号。

