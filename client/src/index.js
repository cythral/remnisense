import "@babel/polyfill";

import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";

Vue.use(VueRouter);

new Vue({
    el: "main",
    router
});