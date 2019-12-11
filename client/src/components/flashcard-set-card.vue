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
export default {
    name: "flashcard-set-card",
    data: function()
    {
        return {
            "name": "",
            "front": ""
        }
    },
    mounted: function()
    {
        const set = this.$store.state[this.set];
        const card = set.cards[this.id];

        Vue.set(this, "name", card.name);
    },
    methods: {

    }
}
</script>