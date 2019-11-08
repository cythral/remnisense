import "@babel/polyfill";

import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import router from "./router";
import store from "./store";

Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
    el: "main",
    router,
    store
});