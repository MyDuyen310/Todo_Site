import {
    createRouter,
    createWebHistory
} from 'vue-router';
import AuthPage from "./pages/auth/UserAuth.vue";
import TodoList from "./pages/todos/TodoList.vue";
import AddTodo from "./pages/todos/AddTodo.vue";
import EditTodo from "./pages/todos/EditTodo.vue";
import store from './store/index.js';
const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            redirect: '/auth'
        },
        {
            path: '/home',
            component: null
        },
        {
            path: '/todos',
            component: TodoList,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/auth',
            component: AuthPage,
            meta: {
                requiresUnauth: true
            }
        },
        {
            path: '/addtodo',
            component: AddTodo,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/todos/:id',
            component: EditTodo,
            props: true,
            meta: {
                requiresAuth: true
            }
        },
    ]
});
router.beforeEach(function (to, _, next) {
    const isAuthenticated = !!store.state.auth.token

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && isAuthenticated) {
        next('/todos')
    } else {
        next();
    }
});

export default router;