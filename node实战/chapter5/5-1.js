const fs = require("fs");
const path = require("path");

const args = process.argv.splice(2); // 获取命令行参数
let command = args.shift();
let taskDescription = args.join(" ");
let file = path.join(process.cwd(), "./tasks"); // 解析数据库的相对路径

switch (command) {
    case "list":
        listTasks(file);
        break;
    case "add":
        addTask(file, taskDescription);
        break;
    case "delete":
        deleteTask(file, taskDescription);
        break;
    default:
        console.log("Usage:" + process.argv[0] + " list|add [taskDescription]");
}

// 从文本文件中加载用JSON编码的数据
function loadOrInitializaTaskArray(file, cb) {
    fs.exists(file, function(exists) {
        let tasks = [];
        if (exists) {
            // 从.tasks文件中取出代办事项
            fs.readFile(file, "utf8", function(err, data) {
                if (err) throw err;
                var data = data.toString();
                let tasks = JSON.parse(data || "[]");
                cb(tasks);
            });
        } else {
            cb([]); // 不存在则创建空的任务数组
        }
    });
}

//列出任务的函数
function listTasks(file) {
    loadOrInitializaTaskArray(file, function(tasks) {
        for (let i in tasks) {
            console.log(tasks[i]);
        }
    });
}

// 将任务保存在磁盘中
function storeTasks(file, tasks) {
    fs.writeFile(file, JSON.stringify(tasks), "utf8", function(err) {
        if (err) throw err;
        console.log("Saved.");
    });
}

//添加一项任务
function addTask(file, taskDescription) {
    loadOrInitializaTaskArray(file, function(tasks) {
        tasks.push(taskDescription);
        console.log(tasks, "task");
        storeTasks(file, tasks);
    });
}

// 删除某项任务
function deleteTask(file, taskDescription) {
    loadOrInitializaTaskArray(file, function(tasks) {
        let reg = new RegExp(taskDescription, "g");
        tasks = tasks.filter(v => !reg.test(v));
        storeTasks(file, tasks);
    });
}
