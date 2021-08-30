export default {
    setTodos(state, payload) {
        state.todos = payload;
    },
    addTodos(state, payload) {
        state.todos.unshift(payload);
    },
    updateTodo(state, updatedTodo) {
        const index = state.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updatedTodo);
        }
    },
    deleteTodo(state, todoId) {
        state.todos = state.todos.filter(t => t.id !== todoId);
    }

};