<template>
    <div class="card" v-for="item in items" :key="`${item.id}${item.title}`">
        <div class="card-image">
            <img :src="item.thumbnail" :alt="item.title">
        </div>
        <div class="card-content">
            <div class="card-body">
                <div class="content-name">
                    <span class="name">{{ item.title }}</span>
                </div>
                <div class="content-price">
                    <span class="price">$ {{ item.price }}</span>
                </div>
            </div>
            <div class="card-action">
                <CustomLink :link="`product/${item.id}`">
                    <template v-slot:text>
                        Ver más...
                    </template>
                </CustomLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import CustomLink from './CustomLink';

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});

const items = computed(()=> props.items);
</script>