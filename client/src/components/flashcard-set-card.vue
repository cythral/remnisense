<template>
    <li>
        <div class="flashcard-set-card-actions">
            <font-awesome-icon :icon="trashIcon" class="flashcard-set-card-delete" v-on:click="deleteCard()"></font-awesome-icon>
        </div>
        <textarea v-model="name"></textarea>
    </li>
</template>

<style scoped lang="scss">
</style>

<script>
import faTrash from "@fortawesome/free-solid-svg-icons";

export default {
    name: "flashcard-set-card",
    props: [
        "set",
        "id"
    ],
    data: function()
    {
        return {
            "set": null,
            "name": "",
            "front": "",
            trashIcon: faTrash
        }
    },
    mounted: function()
    {
        console.log(this.id);
        const set = this.$store.state.sets[this.set];
        const card = set.cards[this.id];

        Vue.set(this, "name", card.name);
    },
    methods: {

    }
}
</script>