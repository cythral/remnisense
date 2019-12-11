<template>
    <li>
        <textarea v-model="name"></textarea>
    </li>
</template>

<style scoped lang="scss">
</style>

<script>
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
            "front": ""
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