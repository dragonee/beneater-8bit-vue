<template>
    <span>
        <span v-for="(n, index) in bits" :key="n">
            <led 
                :on="reverse ? word[bits - 1 - index] : word[index]" :color="computedColor(index)"
                >
            </led> 
            {{ reverse ? safeLabels[bits - 1 - index] : safeLabels[index] }}
        </span>
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
        },
        
        safeLabels() {
            if (this.labels.length) {
                return this.labels
            }
            
            return Array(this.bits).fill('')
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
        },
        
        labels: {
            type: Array,
            default: () => []
        }
    }
}
</script>
