<template>
    <form v-on:submit.prevent="login()">
        <h1>Remnisense Login</h1>

        <div v-if="failed" class="error">
            Invalid email and/or password.
        </div>

        <div class="field">
            <label for="login-email">Email:</label>
            <input v-model="email" id="login-email" type="email" placeholder="john.doe@example.com">
        </div>
        
        <div class="field">
            <label for="login-password">Password:</label>
            <input v-model="password" id="login-password" type="password" placeholder="password">
        </div>

        <input type="submit" value="Login">
    </form>
</template>

<style scoped lang="scss">

$color: black;
$field-height: 50px;

form {
    padding: 30px;    
    text-align: center;

    .field {
        width: 100%;
        display: flex;
        padding: 15px 0;
        height: $field-height;
        align-items: center;
        justify-items: center;
        border-bottom: 1px solid #333;
    
        label {
            flex-basis: 45%;
            text-align: right;
            padding: 0 15px;
            height: 100%;
            line-height: $field-height;
        }

        input {
            flex-basis: 55%;
            height: 100%;
            line-height: $field-height;
            font-size: 1.2em;
            border: none;
            outline: none;
            cursor: pointer;
        }
    }

    [type="submit"] {
        background: $color;
        color: white;
        font-size: 1.2em;
        height: $field-height;
        border: none;
        line-height: $field-height;
        width: 100%;
        margin: 50px 0;
        cursor: pointer;

        &:hover {
            background: lighten($color, 20%);
        }
    }
}
</style>

<script>
export default {
    name: "login",
    props: ["failed"],
    methods: {
        login: async function() 
        {
            const response = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            });

            if(response.status !== 200) {
                this.failed = true;
            }

            const responseJson = await response.json();
        }
    }
}
</script>