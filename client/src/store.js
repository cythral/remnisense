import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

// required when bundled
window.Vue = Vue;

export default new Vuex.Store({
    state: {
        apiToken: null,
        sets: {}
    },
    mutations: {
        reset(state) {
            Vue.set(state, "apiToken", null);
        },

        setApiToken(state, payload) {
            Vue.set(state, "apiToken", payload.apiToken);
        },

        upsertSet(state, payload) {
            Vue.set(state.sets, payload.id, payload);
            console.log("Added set: ", JSON.stringify(payload));
        }
    },
    actions: {
        async getAllSets() {
            if(this.state.apiToken === null) {
                return;
            }

            console.log("Retrieving sets...");
            const response = await fetch("/api/users/me/sets", {
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${this.state.apiToken}`
                }
            });

            const sets = await response.json();
            sets.map(set => this.commit("upsertSet", set));
        }
    },
    plugins: [
        (new VuexPersist({
            key: 'remnisense-store',
            storage: window.localStorage
        })).plugin
    ]
});