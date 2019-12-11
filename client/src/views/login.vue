<template>
    <div class="login form-container">
        <form v-on:submit.prevent="login()">
            <h1>Login</h1>

            <div v-if="failed" class="error">
                Invalid email and/or password.
            </div>

            <div class="field">
                <label for="login-name">Username:</label>
                <input v-model="name" id="login-name" placeholder="john.doe">
            </div>
            
            <div class="field">
                <label for="login-password">Password:</label>
                <input v-model="password" id="login-password" type="password" placeholder="password">
            </div>
            
            <input type="submit" value="Login">
            <div>Or <router-link to="/register">create an account</router-link></div>
        </form>
    </div>
</template>

<style scoped lang="scss">
a {
    color: $primaryColor !important;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    &:visited {
        color: $primaryColor;
    }
}
</style>

<script>
import Vue from "vue";

export default {
    name: "login",
    data: function()
    {
        return {
            failed: false
        };
    },
    mounted: function()
    {
        let apiToken = this.$store.state.apiToken;

        if(apiToken !== null) {
            this.$router.push("/");
        }
    },
    methods: {        
        login: async function() 
        {
            const response = await fetch(`/api/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name: this.name,
                    password: this.password,
                }),
            });

            if(response.status !== 200) {
                Vue.set(this, "failed", true);
                return;
            }

            Vue.set(this, "failed", false);
            
            const payload = await response.json();
            this.$store.commit("setApiToken", { apiToken: payload.token });
            this.$router.push("/");
        }
    }
}
</script>