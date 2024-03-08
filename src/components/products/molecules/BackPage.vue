

<template>
<CustomLink class="link" :link="`/`">
    <template v-slot:text>
        <IconBackVue/>
        Regresar al inicio
    </template>
</CustomLink>

</template>
<script setup>
import IconBackVue from '@/utils/icons/IconBack.vue';
import CustomLink from '../atoms/CustomLink';
</script>

<style scoped>
.link {
    display: flex;
    align-items: center;
    margin: 1.8em 0;
}
</style>