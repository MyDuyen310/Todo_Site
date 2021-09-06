import axios from "../../../helper/axios"

export default {
    async fetchTodos({
        commit
    }, page) {
        try {
            const response = await axios.get("/api/todos", {
                params: {
                    page,
                    limit: 10
                },
            });

            const responseData = response.data.items;
            console.log(response);
            const todos = [];
            for (const data of responseData) {
                todos.push({
                    id: data.id,
                    content: data.content,
                    status: data.status,
                    createdAt: data.created_at
                });
            }
            commit('setTodos', todos);
        } catch (error) {
            console.log(error)
        }

    },
    async addTodo({
        commit
    }, data) {
        try {
            const response = await axios.post("/api/todos", {
                content: data,
            });
            const todo = {
                id: response.data.id,
                content: response.data.content,
                status: response.data.status,
                createdAt: response.data.created_at
            };
            commit('addTodos', todo);
        } catch (error) {
            console.log(error);
        }
    },
    async updateTodo({
        commit
    }, data) {
        const todoData = {
            content: data.content,
            status: data.status,
        };
        const response = await axios.put("/api/todos/" + data.id,
            todoData
        );
        const todo = {
            id: response.data.id,
            content: response.data.content,
            status: response.data.status,
            createdAt: response.data.updated_at
        };
        commit('updateTodo', todo);
    },
    async removeTodo({
        commit
    }, id) {
        const response = await axios.delete("/api/todos/" + id);
        console.log(response);
        commit('deleteTodo', id);
    }
};