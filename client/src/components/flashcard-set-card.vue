<template>
    <li>
        <div class="flashcard-set-card-actions">
            <font-awesome-icon :icon="trashIcon" class="flashcard-set-card-delete" v-on:click="deleteCard()"></font-awesome-icon>
        </div>
        <textarea v-model="name" @contextmenu.prevent="flip()"></textarea>
        <textarea @contextmenu.prevent="flip()">test</textarea>
    </li>
</template>

<style scoped lang="scss">
    li {
        display: inline-block;
        border: 1px solid $primaryColor;
        position: relative;
        transition: transform .5s;
        transform-style: preserve-3d;

        textarea {
            position: absolute;
            top: 0;
            left: 0;
            -webkit-appearance: none;
            appearance: none;
            background: none;
            border: none;
            width: 100%;
            height: 100%;
            padding: 15px;
            text-align: center;
            color: $primaryColor;
            background: white;
            border-radius: 25px;
            transition: transform .5s;

            &:nth-of-type(1) {
                font-weight: bold;
                font-size: 2em;
                z-index: 2;
            }

            &:nth-of-type(2) {
                transform: rotateY(-180deg);
            }

        }

        &.active {
            transform: rotateY(180deg);
        }
    }
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
        flip: function()
        {
            this.$el.classList.toggle("active");
        }
    }
}
</script>