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
        fetch.mockReset();
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

    describe("create new flashcard set button", () =>
    {
        let button;

        beforeEach(() =>
        {
            
            fetch.mockReset();
            store.state.sets = {};
            button = wrapper.find(".create-flashcard-set");
        });

        it("clicking on it should post /api/users/me/sets", async () =>
        {
            const apiToken = "Test token";
            store.commit("setApiToken", { apiToken })

            fetch.mockResponse(JSON.stringify({
                id: 1,
                name: null
            }));

            button.trigger("click");

            expect(fetch).toHaveBeenCalledWith("/api/users/me/sets", expect.objectContaining({
                method: "POST",
                headers: {
                    "authorization": `Bearer ${apiToken}`,
                    "content-type": "application/json"
                }
            }));
        });

        it("clicking on it should create a new flashcard set with no name", async () =>
        {
            const id = 2;
            const name = null;            
            fetch.mockResponse(JSON.stringify({
                id,
                name
            }));

            expect(id in store.state.sets).toBe(false);

            await button.trigger("click");
            await wrapper.vm.$nextTick();

            let set = store.state.sets[id];
            expect(set.name).toBe(name);
            expect(set.id).toBe(id);
        });
    });
});