<template>
    <div class="flashcard-set">
        <input name="name" type="text" v-model="name" v-on:change="updateName()" />
    </div>
</template>

<style scoped lang="scss">
.flashcard-set {
    border: 1px solid $primaryColor;
    color: $primaryColor;
    padding: 15px;
    margin: 15px;
    border-radius: 10px;
    min-height: 200px;

    input[name="name"] {
        background: none;
        border: none;
        font-size: 1.5em;
        color: $primaryColor;
        border-bottom: 1px solid transparent;
        transition: border-color .5s;
        padding: 5px 0; 
        width: 100%;

        &:hover, &:focus {
            border-color: $primaryColor;
        }
    }
}

</style>

<script>
export default {
    name: "flashcard-set",
    props: ["id"],
    data: function()
    {
        return {
            name: null
        };
    },
    mounted: function()
    {
        try {
            const sets = this.$store.state.sets;
            const state = sets[this.id];

            Vue.set(this, "name", state.name);
        } catch(error) {
            console.error("Error updating flashcard set component with state values: ", error);
        }
    },
    methods: {
        updateName: function()
        {
            this.$store.commit("updateSet", {
                id: this.id,
                name: this.name,
            });
        }
    }
}
</script>