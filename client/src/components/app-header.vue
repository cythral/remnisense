<template>
    <header>
        <h1>
            <router-link to="/">Remnisense</router-link>
        </h1>
        <ul class="actions">
            <li><a class="logout" v-if="loggedIn" v-on:click.prevent="logout()">Logout</a></li>
        </ul>
    </header>
</template>

<style lang="scss">
header {
    margin: 0;
    background-color: $primaryColor;
    color: $primaryTextColor;
    height: 80px;
    line-height: 50px;
    
    display: flex;

    h1 {
        padding: 15px;
        flex-basis: 30%;

        a {
            font-weight: normal;
            color: white;
        }
    }

    .actions {
        flex-basis: 70%;
        text-align: right;
        list-style-type: none;
        height: 100%;

        li {
            display: inline-block;
            height: 100%;
            line-height: 80px;

            a {
                height: 100%;
                padding: 0 30px;
                cursor: pointer;
                display: block;
                transition: background-color .2s;

                &:hover {
                    background-color: darken($primaryColor, 20%);
                }
            }
        }
    }
}
</style>

<script>
export default {
    methods: {
        logout: async function()
        {
            const apiToken = this.$store.state.apiToken;
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${apiToken}`
                }
            });

            if(response.status === 200) {                
                this.$store.commit("setApiToken", { apiToken: null });
                this.$router.push("/login");
            }
        }
    },
    computed: {
        loggedIn: function()
        {
            return this.$store.state.apiToken !== null;
        }
    }
}
</script>