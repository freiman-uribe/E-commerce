<script setup>
import CardProduct from '../components/products/molecules/CardProduct';
import BackPage from '../components/products/molecules/BackPage';
import CartProducts from '../components/products/molecules/CartProducts';
</script>

<template>
    <CartProducts/>
    <BackPage class="back-page"/>
    <CardProduct />
</template>

<style scope>
.back-page {
    text-decoration: none;
    color: #00b3b3;
}
</style>