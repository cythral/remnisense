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
        reset(state) 
        {
            Vue.set(state, "apiToken", null);
        },

        setApiToken(state, payload) 
        {
            Vue.set(state, "apiToken", payload.apiToken);
        },

        async updateSet(state, payload) 
        {
            try {
                const response = await fetch(`/api/users/me/sets/${payload.id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                        "authorization": `Bearer ${this.state.apiToken}`
                    },
                    body: JSON.stringify(payload)
                });

                const responseJson = await response.json();
                console.log(responseJson);

                Vue.set(state.sets, payload.id, responseJson);
            } catch(error) {
                console.error(error);
            }
        }
    },
    actions: {
        async getAllSets() 
        {
            Vue.set(this.state, "sets", {});

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
            sets.map(set => Vue.set(this.state.sets, set.id, set));
        }
    },
    plugins: [
        (new VuexPersist({
            key: 'remnisense-store',
            storage: window.localStorage
        })).plugin
    ]
});