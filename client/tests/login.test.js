import Vue from "vue";
import Login from "../src/views/login.vue";

const ERROR_CLASS = ".error";

describe("login", () => 
{
    it("should have no error message on initial setup", async () =>
    {
        const login = new Vue(Login).$mount();
        expect(login.$el.querySelectorAll(ERROR_CLASS).length).toBe(0);
    });

    it("should make a POST request to /api/login on submit", async () =>
    {
        fetch.mockResponse('{}');
        
        const name = "john";
        const password = "password";
        const login = new Vue(Login).$mount();

        login.name = name;
        login.password = password;
        
        await login.login();

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

        const login = new Vue(Login).$mount();
        await login.login();

        expect(login.$el.querySelectorAll(ERROR_CLASS).length).toBe(1);
    });
})