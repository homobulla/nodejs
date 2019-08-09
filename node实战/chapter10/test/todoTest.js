const assert = require("assert");
const Todo = require("../todo.js");

let todo = new Todo();
let testsCompleted = 0;

// equal测试
// 测试以确保删除后没留下待办事项
function deleteTest() {
    todo.add("De");
    assert.equal(todo.getCount(), 1, "1 item should exit.");
    todo.deleteAll();
    assert.equal(todo.getCount(), 0, "No item should exit.");
    testsCompleted++;
}

// NOTEQUAL 找出逻辑问题
function addTest() {
    todo.deleteAll();
    todo.add("Added");
    assert.notEqual(todo.getCount(), 0, "1 item should exits.");
    testsCompleted++;
}

doAsyncTest(() => {
    console.log(1);
});

// 用OK来测试异步是否为TRUE
function doAsyncTest(cb) {
    todo.doAsync(function(value) {
        assert.ok(value, "Callback should be passed true.");
        testsCompleted++;
        cb();
    });
}

// 测试能否正确抛出错误
function throwsTest(cb) {
    // assert.throws(todo.add, {});
    testsCompleted++;
}

deleteTest();
addTest();
throwsTest();
doAsyncTest(function() {
    console.log("testsCompleted is : " + testsCompleted);
});
// console.log(testsCompleted);
