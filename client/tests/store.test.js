import store from "../src/store";

describe("store", () => 
{
    describe("getAllSets", () =>
    {
        beforeEach(() =>
        {
            fetch.mockReset();
        });

        it("should fetch a list of flashcard sets the user owns from /api/users/me/sets", async () =>
        {
            fetch.mockResponse(JSON.stringify([
                {
                    id: 1,
                    name: "Test Set 1"
                },
                {
                    id: 2,
                    name: "Test Set 2"
                }
            ]));

            const apiToken = Date.now();
            store.commit("setApiToken", { apiToken });

            await store.dispatch("getAllSets");

            expect(fetch).toHaveBeenCalledWith("/api/users/me/sets", {
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${apiToken}`
                }
            });
        });

        it("should do nothing if the apiToken is not set", async () =>
        {
            store.commit("setApiToken", { apiToken: null });

            await store.dispatch("getAllSets");

            expect(fetch).not.toHaveBeenCalled();
        });

        it("should delete sets that no longer exist", async () =>
        {
            store.state.sets[1] = {
                id: 1,
                name: "Test Set 1"
            };

            fetch.mockResponse(JSON.stringify([
                {
                    id: 2,
                    name: "Test Set 2"
                }
            ]));

            await store.dispatch("getAllSets");
            expect(store.state.sets[1]).toBe(undefined);
        });
    });
});