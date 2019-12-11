<template>
    <li>
        <font-awesome-icon :icon="trashIcon" class="flashcard-set-card-delete" v-on:click="deleteCard()"></font-awesome-icon>
        <textarea v-model="name" @change="update()" @contextmenu.prevent="flip()"></textarea>
        <textarea v-model="value" @change="update()" @contextmenu.prevent="flip()">test</textarea>
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

        svg {
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 3;
            opacity: 0;
            transition: opacity .5s;
        }

        &:hover {
            svg {
                opacity: 1;
            }
        }

        &.active {
            transform: rotateY(180deg);
        }
    }
</style>

<script>
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
            "value": "",
            "trashIcon": faTrash
        }
    },
    mounted: function()
    {
        console.log(this.id);
        const set = this.$store.state.sets[this.set];
        const card = set.cards[this.id];

        Vue.set(this, "name", card.name);
        Vue.set(this, "value", card.value);
    },
    methods: {
        flip: function()
        {
            this.$el.classList.toggle("active");
        },

        update: async function()
        {
            const response = await fetch(`/api/users/me/sets/${this.set}/cards/${this.id}`,
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${this.$store.state.apiToken}`
                },
                body: JSON.stringify({
                    name: this.name,
                    value: this.value,
                })
            });

            if(response.status !== 200) {
                console.error(await response.text());
                return;
            }

            console.log(`Updated card ${this.id} with name: ${this.name} and value: ${this.value}`);
        },

        deleteCard: async function()
        {
            const response = await fetch(`/api/users/me/sets/${this.set}/cards/${this.id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${this.$store.state.apiToken}`
                }
            });

            if(response.status !== 200) {
                console.error(await response.text());
                return;
            }

            Vue.delete(this.$store.state.sets[this.set].cards, this.id);
            console.log(`Deleted card ${this.id}`);
        }
    }
}
</script>