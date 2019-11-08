import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../src/views/login.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";

const ERROR_CLASS = ".error";


describe("login", () => 
{
    let wrapper;
    let localVue;

    beforeEach(() => 
    {
        const localVue = createLocalVue();
        const $router = {
            push: jest.fn()
        };

        wrapper = shallowMount(Login, {
            localVue,
            mocks: {
                $router
            }
        });
    });

    it("should have no error message on initial setup", async () =>
    {
        expect(wrapper.find(".error").exists()).toBe(false);
    });

    it("should make a POST request to /api/login on submit", async () =>
    {
        fetch.mockResponse('{}');
        
        const name = "john";
        const password = "password";

        wrapper.vm.name = name;
        wrapper.vm.password = password;
        
        await wrapper.vm.login();

        expect(fetch).toHaveBeenCalledWith("/api/login", expect.objectContaining({
            method: "POST",
            body: JSON.stringify({
                name,
                password
            })
        }));
    });

    it("should display an error if /api/login returns a non-200 response code", async () =>
    {
        fetch.mockResponse("{}", { status: 400 });

        await wrapper.vm.login();

        expect(wrapper.find(ERROR_CLASS).exists()).toBe(true);
    });

    it("should redirect to the dashbard if /api/login returned a 200-respponse code", async () =>
    {
        fetch.mockResponse("{}");

        await wrapper.vm.login();

        expect(wrapper.vm.$router.push).toHaveBeenCalledWith("/");
    });
})