import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import AppHeader from "../../src/components/app-header.vue";
import store from "../../src/store";


describe("app-header", () =>
{
    let localVue;
    let router;
    let wrapper;
    
    function mount()
    {
        wrapper = shallowMount(AppHeader, {
            localVue,
            store,
            stubs: [
                "router-link"
            ],
            mocks: {
                $router: router
            }
        });
    }

    beforeEach(() => 
    {
        fetch.mockReset();
        localVue = createLocalVue();
        localVue.use(Vuex);
        
        router = {
            push: jest.fn()
        };

        store.dispatch = jest.fn();        
    });

    describe("logout button", () =>
    {
        it("should not exist if there is no apiToken present", () =>
        {
            mount();
            
            const logout = wrapper.find(".logout");
            expect(logout.exists()).toBe(false);
        });

        it("clicking it should post /api/logout", async () =>
        {
            fetch.mockResponse("{}");
            const apiToken = "Test token";

            store.commit("setApiToken", { apiToken });
            mount();
            
            const logout = wrapper.find(".logout");
            logout.trigger("click");
            await wrapper.vm.$nextTick();

            expect(fetch).toHaveBeenCalledWith("/api/logout", {
                method: "POST",
                headers: expect.objectContaining({
                    "content-type": "application/json",
                    "authorization": `Bearer ${apiToken}`
                })
            });
        });

        it("should redirect to /login if no error occurred", async () =>
        {
            fetch.mockResponse("{}");
            const apiToken = "Test token";

            store.commit("setApiToken", { apiToken });
            mount();

            const logout = wrapper.find(".logout");
            logout.trigger("click");
            await wrapper.vm.$nextTick();

            expect(router.push).toHaveBeenCalledWith("/login");
        });

        it("should not redirect to /login if an error occurred", async () =>
        {
            fetch.mockResponse("{}", { status: 500 });
            const apiToken = "Test token";

            store.commit("setApiToken", { apiToken });
            mount();

            const logout = wrapper.find(".logout");
            logout.trigger("click");
            await wrapper.vm.$nextTick();

            expect(router.push).not.toHaveBeenCalled();
        });

        it("should delete the apiToken from the store if no error occurred", async () =>
        {
            fetch.mockResponse("{}");
            const apiToken = "Test token";

            store.commit("setApiToken", { apiToken });
            mount();

            const logout = wrapper.find(".logout");
            logout.trigger("click");
            await wrapper.vm.$nextTick();

            expect(store.state.apiToken).toBe(null);
        });

        it("should not delete the apiToken from the store if an error occurred", async () =>
        {
            fetch.mockResponse("{}", { status: 500 });
            const apiToken = "Test token";

            store.commit("setApiToken", { apiToken });
            mount();

            const logout = wrapper.find(".logout");
            logout.trigger("click");
            await wrapper.vm.$nextTick();

            expect(store.state.apiToken).toBe(apiToken);
        });
    });
});