<script setup>
import CartProductsDetails from '../components/products/molecules/CartProductsDetails';
import BackPage from '../components/products/molecules/BackPage'
</script>

<template>
    <BackPage class="back-page"/>
    <h1 class="title-cart">Lista de compras</h1>
    <CartProductsDetails/>
</template>

<style scope>
.title-cart {
  font-weight: normal;
}
</style>