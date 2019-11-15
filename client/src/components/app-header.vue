<template>
    <header>
        <h1>
            <a href="/" rel="home">Remnisense</a>
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
            text-transform: uppercase;
            font-weight: normal;
            letter-spacing: 1px;
            color: white;
        }
    }
}
</style>

<script>
export default {    }
</script>