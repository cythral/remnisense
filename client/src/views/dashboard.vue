<template>
    <main>
        <div class="actions">
            <a class="btn create-flashcard-set" v-on:click.prevent="insertSet()">
                <font-awesome-icon :icon="newSetIcon"></font-awesome-icon>
                New Set
            </a>
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
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default {
    name: "dashboard",
    data: function()
    {
        return {
            "newSetIcon": faPlus
        };
    },
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