/**
 * date: 2019-06-03
 */
class Todo {
    constructor(todos) {
        this.todos = todos;
    }
    add(item) {
        if (!item) {
            throw new Error("itme has no decalar");
        }
        this.todos.add(item);
    }
    deleteAll() {
        this.todos = [];
    }
    getCount() {
        return this.todos.length;
    }
    doAsync(cb) {
        setTimeout(cb, 2000, true);
    }
}

module.exports = Todo;
