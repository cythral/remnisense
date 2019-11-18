<template>
    <div class="flashcard-set">
        <div class="flashcard-set-top">
            <input name="name" type="text" v-model="name" v-on:change="updateName()" placeholder="Unnamed Set" />
            <div class="flashcard-set-actions"> 
                <font-awesome-icon :icon="trashIcon" class="delete" v-on:click="deleteSet()"></font-awesome-icon>
            </div>
        </div>
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
            text-align: right;

            svg {
                font-size: 1.1em;
                cursor: pointer;
                transition: transform .2s;

                &:hover {
                    transform: scale(1.5);
                }
            }
        }
    }
}

</style>

<script>
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default {
    name: "flashcard-set",
    props: ["id"],
    data: function()
    {
        return {
            name: null,
            new: false,
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
        }
    }
}
</script>