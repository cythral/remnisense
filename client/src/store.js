import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

// required when bundled
window.Vue = Vue;

export default new Vuex.Store({
    plugins: [
        new VuexPersist({
            key: 'remnisense-store',
            storage: localStorage
        })
    ]
});