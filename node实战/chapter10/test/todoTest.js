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
deleteTest();

// NOTEQUAL 找出逻辑问题
function addTest(){
	todo.deleteAll();
	todo
}