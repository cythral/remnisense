import VueRouter from "vue-router";
import Login from "./views/login.vue";

export default new VueRouter({
    mode: "history",
    routes: [
        { path: '/login', component: Login }
    ]
})