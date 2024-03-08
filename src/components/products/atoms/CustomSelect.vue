<template>
    <select>
        <slot name="optionDefault"></slot>
        <option v-for="option in optionsList" :key="option.id" :value="option.id">{{ option.name }}</option>
    </select>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
    options: {
        type: Array,
        required: true
    }
});

const optionsList = computed(() => props.options);
</script>