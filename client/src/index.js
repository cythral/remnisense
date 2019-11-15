import "@babel/polyfill";

import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

// components
import AppHeader from "./components/app-header.vue";

// app utilities/plugins
import router from "./router";
import store from "./store";

Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
    el: "#app-container",
    router,
    store,
    components: {
        "app-header": AppHeader
    },
});