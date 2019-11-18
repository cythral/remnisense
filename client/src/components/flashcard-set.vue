<template>
    <div class="flashcard-set">
        <div class="flashcard-set-top">
            <input name="name" type="text" v-model="name" v-on:change="updateName()" placeholder="Unnamed Set" />
            <div class="flashcard-set-actions"> 
                <font-awesome-icon :icon="trashIcon" class="flashcard-set-delete" v-on:click="deleteSet()"></font-awesome-icon>
            </div>
        </div>

        <ul>
            <li class="flashcard-set-create-card" v-on:click="createFlashcard()">
                <div><font-awesome-icon :icon="newFlashcardIcon"></font-awesome-icon></div>
                New Card
            </li>
        </ul>
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

    .flashcard-set-top {
        display: flex;
        height: 50px;

        input[name="name"] {
            background: none;
            border: none;
            font-size: 1.5em;
            color: $primaryColor;
            border-bottom: 1px solid transparent;
            transition: border-color .2s;
            padding: 5px 0; 
            flex-basis: 60%;

            &:hover, &:focus {
                border-color: $primaryColor;
            }
        }

        .flashcard-set-actions {
            flex-basis: 40%;
            font-size: 25px;
            text-align: right;
            padding: 5px 0;

            svg {
                
                cursor: pointer;
                transition: transform .2s;

                &:hover {
                    transform: scale(1.5);
                }
            }
        }
    }

    ul {
        list-style-type: none;
        height: 150px;

        li {
            margin: 15px;
            width: 15%;
            height: 100%;
            border-radius: 10px;
            text-align: center;

            &:first-of-type {
                margin-left: 0;
                border: 1px dashed $primaryColor;
                padding-top: 25px;
                cursor: pointer;
                transition: background-color .2s, color .2s;

                svg {
                    font-size: 75px;
                }

                span {
                    width: 100%;
                }

                &:hover {
                    background-color: $primaryColor;
                    color: $primaryTextColor;
                }
            }
        }
    }
}

</style>

<script>
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default {
    name: "flashcard-set",
    props: ["id"],
    data: function()
    {
        return {
            name: null,
            new: false,
            newFlashcardIcon: faPlus,
            trashIcon: faTrash
        };
    },
    mounted: function()
    {
        try {
            const sets = this.$store.state.sets;
            const state = sets[this.id];

            Vue.set(this, "name", state.name);
            
            if(state.new) {
                let nameInput = this.$el.querySelector('[name="name"]');
                nameInput.focus();
                
                delete state.new;
            }
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
        },

        deleteSet: function()
        {
            this.$store.commit("deleteSet", {
                id: this.id,
            });
        },

        createFlashcard: function()
        {
            this.$store.commit("createFlashcard", {
                setId: this.id
            });
        }
    }
}
</script>