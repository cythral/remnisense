import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { Store } from "vuex";
import Dashboard from "../src/views/dashboard.vue";
import FlashcardSet from "../src/components/flashcard-set.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import store from "../src/store";

describe("dashboard", () =>
{
    let localVue;
    let router;
    let wrapper;

    beforeEach(() => 
    {
        localVue = createLocalVue();
        localVue.use(Vuex);
        
        router = {
            push: jest.fn()
        };

        store.dispatch = jest.fn();
        store.commit("setApiToken", { token: "example token" });

        wrapper = shallowMount(Dashboard, {
            localVue,
            store,
            mocks: {
                $router: router
            }
        });
    });

    it("should redirect to /login if not logged in", async () =>
    {
        store.commit("reset");
        
        wrapper = shallowMount(Dashboard, {
            localVue,
            store,
            mocks: {
                $router: router
            }
        });

        expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/login");
    });

    it("should not redirect to /login if already logged in", async () =>
    {
        expect(wrapper.vm.$router.push).not.toHaveBeenCalled();
    });

    it("should display a list of flashcard sets the user owns", async () =>
    {
        Vue.set(wrapper.vm.$store.state, "sets", {
            [1]: {
                id: 1,
                name: "Test Set 1"
            },

            [2]: {
                id: 2,
                name: "Test Set 2"
            }
        });

        expect(wrapper.findAll(FlashcardSet).length).toBe(2);
    });
});