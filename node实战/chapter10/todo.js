/**
 * date: 2019-06-03
 */
class Todo {
    constructor(todos) {
        this.todos = [];
    }
    add(item) {
        if (!item) {
            throw new Error("itme has no decalar");
        }
        this.todos.push(item);
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
