import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

// required when bundled
window.Vue = Vue;

export default new Vuex.Store({
    state: {
        apiToken: null
    },
    mutations: {
        reset(state) {
            Vue.set(state, "apiToken", null);
        },

        setApiToken(state, payload) {
            Vue.set(state, "apiToken", payload.apiToken);
        }
    },
    plugins: [
        (new VuexPersist({
            key: 'remnisense-store',
            storage: window.localStorage
        })).plugin
    ]
});