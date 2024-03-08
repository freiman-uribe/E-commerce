<template>
    <div>
        <div class="diagonal-text">
            <span class="percentage">{{ details.discountPercentage }}%</span>
        </div>
        <div class="card-header">
            <h2 class="price">${{ details.priceTotal }}</h2>
            <div class="base-price">
                <h3 class="price-discount">${{ details.price }}</h3>
            </div>
            <h4 class="product-name">{{ details.title }}</h4>
        </div>
        <div class="card-body">
            <p>{{ details.description }}</p>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const details = computed(() => props.product);
</script>

<style scoped>

.diagonal-text {
    position: absolute;
    top: 10px;
    right: -16px;
    transform: rotate(45deg);
    background-color: #ff0000; 
    color: #ffffff;
    padding: 5px 20px;
}

.percentage {
    font-size: 20px;
}

.card-header,
.card-body {
    text-align: center;
}

.card-header {
  display: grid;
  justify-content: center;
}

h1, h2, h3, h4, h5 {
    margin: 10px;
}

.price {
    font-size: 26px;
}

.base-price {
    width: 100%;
    display: grid;
    justify-content: center;
}

.price-discount {
    position: relative;
    width: 100px;
    font-size: 20px;
    color: #777777;
}

.price-discount::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -2%;
    width: 100%;
    height: 2px;
    background: red;
    transform: rotate(-4deg);
}

</style>

   