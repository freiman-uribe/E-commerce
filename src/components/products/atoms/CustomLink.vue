<template>    
    <router-link class="button" :to="url">
        <slot name="text"></slot>
    </router-link>
</template>

<script setup>
import { defineProps, computed } from 'vue';
const props = defineProps({
    link: {
        type: String,
        required: true
    }
});

const url = computed(() => props.link);
</script>