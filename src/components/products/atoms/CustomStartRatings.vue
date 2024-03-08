<template>
    <vue3-star-ratings v-model="localRating" :disableClick="true" />
</template>
   
<script setup>
import { defineProps, computed } from 'vue';
import vue3StarRatings from 'vue3-star-ratings';

const props = defineProps(['rating']);

const localRating = computed(() => props.rating)
</script>
   