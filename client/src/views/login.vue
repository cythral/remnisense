<template>
    <div class="login">
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
        </form>
    </div>
</template>

<style scoped lang="scss">

.login {
    text-align: center;

    form {
        padding: 30px;    
        display: inline-block;
        max-width: 1000px;
        width: 100%;

        h1 {
            margin: 15px 0;
        }

        .error {
            font-size: 1.5em;
            color:#F44336;
            margin: 15px 0;
        }

        .field {
            width: 100%;
            display: flex;
            padding: 15px 0;
            height: 50px;
            align-items: center;
            justify-items: center;
            border-bottom: 1px solid #333;
        
            label {
                flex-basis: 45%;
                text-align: right;
                padding: 0 15px;
                height: 100%;
                line-height: 20px;
            }

            input {
                flex-basis: 55%;
                height: 100%;
                line-height: 50px;
                font-size: 1.2em;
                border: none;
                outline: none;
                cursor: text;
            }
        }

        [type="submit"] {
            background: $primaryColor;
            color: white;
            font-size: 1.2em;
            height: 50px;
            border: none;
            line-height: 50px;
            width: 100%;
            margin: 50px 0;
            cursor: pointer;

            &:hover {
                background: darken($primaryColor, 20%);
            }
        }
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