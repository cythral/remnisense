import Vue from "vue";
import VueRouter from "vue-router";
import Vuex, { Store } from "vuex";
import Dashboard from "../src/views/dashboard.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";

describe("dashboard", () =>
{
    let localVue;
    let store;
    let router;
    let wrapper;

    beforeEach(() => 
    {
        localVue = createLocalVue();
        localVue.use(Vuex);

        store = new Store();
        router = {
            push: jest.fn()
        };

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
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/login");
    });
});