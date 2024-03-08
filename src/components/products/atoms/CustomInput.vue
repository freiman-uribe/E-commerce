<template>
    <input v-model="valueInput" :type="typeInput" :placeholder="placeholderInput" :required="requiredInput"/>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
    valueInput: {
        type: String,
        default:'',
    },
    typeInput: {
        type: String,
        default:'text',
    },
    placeholderInput: {
        type: String,
        default:'',
    },
    requiredInput: {
        type: Boolean,
        default: false
    }
})

const valueInput = computed(()=> props.valueInput);
const typeInput = computed(()=> props.typeInput);
const placeholderInput = computed(()=> props.placeholderInput);
const requiredInput = computed(()=> props.requiredInput);
</script>