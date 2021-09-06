import {
    createStore
} from 'vuex';
import todosModule from './module/todos/index.js';
import authModule from './module/auth/index.js';
const store = createStore({
    strict: true,
    modules: {
        todos: todosModule,
        auth: authModule
    }
});
export default store;