import "@babel/polyfill";

import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

// https://github.com/FortAwesome/vue-fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

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