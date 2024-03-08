<template>    
    <button class="button" :disabled="isDisabled">
        <slot name="text"></slot>
        <slot name="icon"></slot>
    </button>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false
    }
});

const isDisabled = computed(()=>  props.disabled);
</script>

<style scoped>
.button {
    border-radius: 5px;
    border: 1px solid #00b3b3;
    background-color: #00b3b3;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
}

.button:disabled {
 background: #ccc;
 cursor: not-allowed;
}
</style>
   