/**
 * Created by homobulla on 19/05/15.
 */
/**
 * 服务端socket具体业务函数，输出一个监听方法
 *
 * */

const socketio = require("socket.io");
let io,
    guestNmuber = 1,
    nickName = {},
    nameUsed = [],
    currentRoom = {};

exports.listen = function(server) {
    io = socketio.listen(server);
    io.sockets.on("connection", function(socket) {
        guestNmuber = assignGuestName(socket, guestNmuber, nickName, nameUsed);

        joinRoom(socket, "Lobby"); // 进入房间
        handleMessageBroadcasting(socket, nickName); //
        handleChangeNameAttempts(socket, nickName, nameUsed); //更名
        handleRoomJoining(socket);

        // socket.on("rooms", function() {
        //     socket.emit("rooms", io.sockets.manager.rooms);
        // });
        handleClientDisconnection(socket, nickName, nameUsed);
    });
};
// 分配用户昵称
function assignGuestName(socket, guestNmuber, nickName, nameUsed) {
    let name = "Guest" + guestNmuber;
    nickName[socket.id] = name;
    socket.emit("nameResult", {
        success: true,
        name
    });
    nameUsed.push(name);
    return guestNmuber + 1;
}

//进入聊天室
function joinRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit("joinResult", { room });
    socket.broadcast.to(room).emit("message", {
        text: nickName[socket.id] + "has joined" + room + "."
    });
    // console.log("这是输出开始", io.sockets.clients, "这是输出结束");
    // let usersInRoom = io.sockets.clients(room); // 获取房间总人数
    // if (usersInRoom.length > 1) {
    //     var userInRoomSummary = "Users currently in " + room + ":";
    //     for (let index in usersInRoom) {
    //         let userSocketId = userInRoom[index].id;
    //         if (userSocketId != socket.id) {
    //             if (index > 0) {
    //                 userInRoomSummary += ",";
    //             }

    //             userInRoomSummary += nickName[userSocketId];
    //         }
    //     }
    // }

    // userInRoomSummary += ".";
    // socket.emit("message", { text: userInRoomSummary });
}

// 处理昵称变更请求
function handleChangeNameAttempts(socket, nickName, nameUsed) {
    socket.on("nameAttempt", function(name) {
        // 昵称不能以Guest开头
        if (name.indexOf("Guest") == 0) {
            socket.emit("nameResult", {
                success: false,
                message: "Name cannot begin with 'Guest'."
            });
        } else {
            if (nameUsed.indexOf(name) == -1) {
                // 若昵称不重复则添加，同时删除之前所用昵称
                let previousName = nickName[socket.id]; //之前的昵称，昵称与socket.id绑定着
                let previousNameIndex = nameUsed.indexOf(previousName);
                nameUsed.push(name);
                nickName[socket.id] = name;
                delete nameUsed[previousNameIndex];
                socket.emit("nameResult", {
                    success: true,
                    name
                });

                socket.broadcast.to(currentRoom[socket.id]).emit("message", {
                    text: previousName + "is now known as " + name + "."
                });
            } else {
                socket.emit("nameResult", {
                    success: false,
                    message: "That name is already in use."
                });
            }
        }
    });
}
// 转发消息
// 服务端收到消息后即在该用户房间广播该消息
function handleMessageBroadcasting(socket) {
    socket.on("message", function(message) {
        socket.broadcast.to(message.room).emit("message", {
            text: nickName[socket.id] + ":" + message.text
        });
    });
}

// 加入房间，若无该房间即创建房间
function handleRoomJoining(socket) {
    socket.on("join", function(room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket, room.newRoom);
    });
}

// 断开链接
function handleClientDisconnection(socket) {
    socket.on("disconnect", function() {
        let nameIndex = nameUsed.indexOf(nickName[socket.id]);
        delete nameUsed[nameIndex];
        delete nickName[socket.id];
    });
}
