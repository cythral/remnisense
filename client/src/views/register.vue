<template>
    <div class="form-container">    
        <form v-on:submit.prevent="register()">
            <h1>Register</h1>

            <div v-if="failed" class="error">
                {{ error }}
            </div>

            <div class="field">
                <label for="reg-name">Username:</label>
                <input v-model="name" id="reg-name" placeholder="john.doe">
            </div>
            
            <div class="field">
                <label for="login-password">Password:</label>
                <input v-model="password" id="reg-password" type="password" placeholder="password">
            </div>

            <div class="field">
                <label for="reg-password-confirm">Confirm Password:</label>
                <input v-model="passwordConfirm" id="reg-password-confirm" type="password" placeholder="confirm password">
            </div>

            <input type="submit" value="Register">
        </form>
    </div>
</template>

<style scoped lang="scss">
    form {
        padding: 15px;
        text-align: center;
    }
</style>

<script>
export default {
    data: function()
    {
        return {
            failed: false,
            error: ''
        }
    },
    methods: {
        register: async function()
        {
            Vue.set(this, "failed", false);
            Vue.set(this, "error", "");

            if(this.password != this.passwordConfirm) {
                Vue.set(this, "failed", true);
                Vue.set(this, "error", "Passwords do not match");
                return;
            }

            const regResponse = await fetch("/api/register", 
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: this.name,
                    password: this.password
                })
            });

            if(regResponse.status !== 200) {
                Vue.set(this, "failed", true);
                Vue.set(this, "error", await regResponse.text());
                return;
            }

            const loginResponse = await fetch("/api/login",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: this.name,
                    password: this.password
                })
            });

            if(loginResponse.status !== 200) {
                Vue.set(this, "failed", true);
                Vue.set(this, "error", await loginResponse.text());
                return;
            }

            const apiToken = (await loginResponse.json()).token;
            this.$store.commit("setApiToken", { apiToken });
            this.$router.push("/");
        }
    }
}
</script>