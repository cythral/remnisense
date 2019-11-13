<template>
    <h1>Dashboard</h1>
</template>

<style scoped lang="scss">
</style>

<script>
import Vue from "vue";

export default {
    name: "dashboard",
    mounted: function()
    {
        let apiToken = this.$store.state.apiToken;

        if(apiToken === null) {
            this.$router.push("/login");
        }
    }
}
</script>