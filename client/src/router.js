import VueRouter from "vue-router";
import Login from "./views/login.vue";
import Dashboard from "./views/dashboard.vue";

export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/",        component: Dashboard    },
        { path: '/login',   component: Login        }
    ]
})