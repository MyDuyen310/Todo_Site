import axios from 'axios';
export default {
    async login(context, payload) {

        const response = await axios.post("https://todo-mvc-api-typeorm.herokuapp.com/auth/login", {
            username: payload.username,
            password: payload.password,

        });
        const data = response.data;
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        context.commit('setUser', {
            token: data.token,
            userId: data.id,
        })
    },
    async signup(context, payload) {

        const response = await axios.post("https://todo-mvc-api-typeorm.herokuapp.com/auth/register", {
            username: payload.username,
            password: payload.password,

        });
        const data = response.data;
        console.log(data);
    },
    tryLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId
            });
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        context.commit('setUser', {
            token: null,
            userId: null,
        })

    }

};