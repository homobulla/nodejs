const fs = require("fs");
let completedTasks = 0; // 任务计数器
let tasks = [];
let wordCounts = {};
const fileDir = "./text";

// 当所有任务完成时，列出文件中用到的每个单词以及用了多少次。
function checkIfComplete() {
    completedTasks++;
    if (completedTasks == tasks.length) {
        for (let index in wordCounts) {
            console.log(index + " : " + wordCounts[index]);
        }
    }
}

// 统计文本中单词出现次数
function countWordsInText(text) {
    let words = text
        .toString()
        .toLowerCase()
        .split(/\W/)
        .sort();
    for (let word of words) {
        if (word) {
            wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
        }
    }
}

fs.readdir(fileDir, function(err, files) {
    if (err) throw err;
    for (let index in files) {
        let task = (function(file) {
            return function() {
                fs.readFile(file, function(err, text) {
                    if (err) throw err;
                    countWordsInText(text);
                    checkIfComplete();
                });
            };
        })(fileDir + "/" + files[index]);
        tasks.push(task);
    }

    for (let task in tasks) {
        tasks[task]();
    }
});
