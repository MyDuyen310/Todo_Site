import axios from 'axios';
import queryString from 'query-string';
const url = "https://todo-mvc-api-typeorm.herokuapp.com/api/todos";
export default {
    async fetchTodos(context) {
        const token = context.rootGetters.token;
        axios.defaults.headers = {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(url, {
            params: {
                page: 1,
                limit: 10
            },
            paramsSerializer: (params) => queryString.stringify(params),
        });
        const responseData = response.data.items;
        const todos = [];
        for (const key in responseData) {
            const todo = {
                id: responseData[key].id,
                content: responseData[key].content,
                status: responseData[key].status,
                createdAt: responseData[key].created_at
            };
            todos.push(todo);
        }
        context.commit('setTodos', todos);
    },
    async addTodo(context, data) {
        const token = context.rootGetters.token;
        axios.defaults.headers = {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const todoData = {
            content: data,
        };
        const response = await axios.post(url, todoData);
        console.log(response);
        const todo = {
            id: response.data.id,
            content: response.data.content,
            status: response.data.status,
            createdAt: response.data.created_at
        };
        context.commit('addTodos', todo);
    },
    async updateTodo(context, data) {
        const token = context.rootGetters.token;
        axios.defaults.headers = {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const todoData = {
            content: data.content,
            status: data.status,
        };
        const response = await axios.put(url + "/" + data.id, todoData);
        console.log(response);
        const todo = {
            id: response.data.id,
            content: response.data.content,
            status: response.data.status,
            createdAt: response.data.updated_at
        };
        context.commit('updateTodo', todo);
    },
    async removeTodo(context, id) {
        const token = context.rootGetters.token;
        axios.defaults.headers = {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.delete(url + "/" + id);
        console.log(response);
        context.commit('deleteTodo', id);
    }
};