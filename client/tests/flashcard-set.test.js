import Vuex from "vuex";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import FlashcardSet from "../src/components/flashcard-set.vue";
import store from "../src/store";

console.error = jest.fn();

describe("flashcard-set", () => 
{
    let wrapper;
    let localVue;
    let router;

    function mount(id = 1) {
        wrapper = shallowMount(FlashcardSet, {
            localVue,
            store,
            attachToDocument: true,
            propsData: {
                id
            },
            mocks: {
                $router: router
            }
        });
    }

    beforeEach(() => 
    {

        localVue = createLocalVue();
        localVue.use(Vuex);

        store.commit("reset");

        router = {
            push: jest.fn()
        };

        mount();
    });

    describe("title", () =>
    {
        let input;

        beforeEach(() =>
        {
            input = wrapper.find('[name="name"]');
        });

        it("changing the value should patch /api/users/me/sets/:set", async () =>
        {
            fetch.mockResponse('{}');

            const id = 1;
            const name = "Test Set 1";
            const apiToken = "Test token";

            store.commit("setApiToken", { apiToken });
            Vue.set(wrapper.vm, "id", id);

            input.setValue(name);
            await input.trigger("change");
            
            expect(fetch).toHaveBeenCalledWith(`/api/users/me/sets/${id}`, expect.objectContaining({
                method: "PATCH",
                headers: expect.objectContaining({
                    "content-type": "application/json",
                    "authorization": `Bearer ${apiToken}`
                }),
                body: JSON.stringify({ id, name })
            }));
        });
    });

    describe("actions", () =>
    {
        it("clicking on the delete icon should delete /api/users/me/sets/:set", async () =>
        {
            fetch.mockResponse("{}");

            const id = 1;
            const apiToken = "Test token";

            store.commit("setApiToken", { apiToken });
            Vue.set(wrapper.vm, "id", id);

            const deleteBtn = wrapper.find(".delete");
            deleteBtn.trigger('click');
            await wrapper.vm.$nextTick();

            expect(fetch).toHaveBeenCalledWith(`/api/users/me/sets/${id}`, {
                method: "DELETE",
                headers: expect.objectContaining({
                    "content-type": "application/json",
                    "authorization": `Bearer ${apiToken}`
                })
            });
        });
    });
    
});