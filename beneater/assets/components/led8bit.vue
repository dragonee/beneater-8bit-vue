<template>
    <span>
        <led v-for="(n, index) in bits" :key="n" :on="reverse ? word[bits - 1 - index] : word[index]" :color="computedColor(index)"></led>
    </span>
</template>
<script>
export default {
    computed: {
        computedColor() {
            return (index) => {
                if (typeof(this.color) === 'string') {
                    return this.color
                }
                
                return this.color[index]
            }
        }
    },
    
    props: {
        word: Array,
        color: {
            validator(value) {
                return Array.isArray(value) || ['red', 'green', 'blue', 'yellow'].indexOf(value) !== -1
            },
            
            default: 'red'
        },
        
        reverse: Boolean,
        
        bits: {
            type: Number,
            default: 8
        }
    }
}
</script>
