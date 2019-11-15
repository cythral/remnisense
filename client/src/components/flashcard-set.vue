<template>
    <div class="flashcard-set">
        <h2>{{ name }}</h2>
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

    h2 {
        font-weight: normal;
    }
}

</style>

<script>
export default {
    name: "flashcard-set",
    props: ["name"]
}
</script>