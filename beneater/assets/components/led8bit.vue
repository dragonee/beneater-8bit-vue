<template>
    <span>
        <led v-for="(n, index) in 8" :key="n" :on="word[index]" :color="color"></led>
    </span>
</template>
<script>
export default {
    props: {
        word: Array,
        color: {
            validator(value) {
                return ['red', 'green', 'blue'].indexOf(value) !== -1
            },
            
            default: 'red'
        }
    }
}
</script>
