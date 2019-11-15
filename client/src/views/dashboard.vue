<template>
    <main>
        <flashcard-set v-for="set in sets" :key="set.id" v-bind:name="set.name"></flashcard-set>
    </main>
</template>

<style scoped lang="scss">
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
    computed: 
    {
        sets() 
        {
            return this.$store.state.sets;
        },
    }
}
</script>