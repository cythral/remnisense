<template>
    <main>
        <div class="actions">
            <a class="btn create-flashcard-set" v-on:click.prevent="insertSet()">New Set</a>
        </div>

        <flashcard-set v-for="set in $store.state.sets" :key="set.id" :id="set.id"></flashcard-set>
    </main>
</template>

<style scoped lang="scss">
.actions {
    margin: 15px;
    text-align: right;
}
</style>

<script>
import Vue from "vue";
import FlashcardSet from "../components/flashcard-set.vue";

export default {
    name: "dashboard",
    components: 
    {
        "flashcard-set": FlashcardSet
    },
    mounted: async function()
    {
        let apiToken = this.$store.state.apiToken;

        if(apiToken === null) {
            this.$router.push("/login");
        }

        await this.$store.dispatch("getAllSets");
    },
    methods:
    {
        insertSet: async function()
        {
            await this.$store.commit("insertSet");
        }
    },
    computed: 
    {
        sets() 
        {
            return this.$store.state.sets;
        },
    }
}
</script>