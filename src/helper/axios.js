import axios from "axios";
import store from "../store/index.js"
const instance = axios.create({
    baseURL: 'https://todo-mvc-api-typeorm.herokuapp.com'
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    if (store.state.auth.token) {
        config.headers.common = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.state.auth.token}`,
        };
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

function onResponse(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}

function onError(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
}
// Add a response interceptor
instance.interceptors.response.use(onResponse, onError);
export default instance;