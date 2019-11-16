<template>
    <header>
        <h1>
            <router-link to="/">Remnisense</router-link>
        </h1>
    </header>
</template>

<style lang="scss">
header {
    margin: 0;
    background-color: $primaryColor;
    color: $primaryTextColor;
    height: 80px;
    line-height: 50px;
    padding: 15px;

    h1 {
        a {
            font-weight: normal;
            color: white;
        }
    }
}
</style>

<script>
export default {    }
</script>