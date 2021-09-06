import axios from "../../../helper/axios"
export default {
    async login({
        commit
    }, payload) {

        const response = await axios.post("/auth/login", {
            username: payload.username,
            password: payload.password,

        });
        const data = response.data;
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        commit('setUser', {
            token: data.token,
            userId: data.id,
        })
    },
    async signup(context, payload) {
        // console.log(data);
        const response = await axios.post("/auth/register", {
            username: payload.username,
            password: payload.password,
        });

        const dataRespon = response.data;
        console.log(dataRespon);
    },
    tryLogin({
        commit
    }) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            commit('setUser', {
                token: token,
                userId: userId
            });
        }
    },
    logout({
        commit
    }) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        commit('setUser', {
            token: null,
            userId: null,
        })

    }

};