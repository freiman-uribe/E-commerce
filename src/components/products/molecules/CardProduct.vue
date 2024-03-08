<template>
    <div class="content">
        <div class="card-product">
            <div class="card-slider">
                <CustomCarrousel :images="product.images" />
            </div>
            <div class="card-content">
                <div class="card-details">
                    <CustomDetails :product="product"/>
                </div>
                <div class="card-footer">
                    <div class="content-footer">
                        <span class="category-product">{{ product.category }}</span>
                        <CustomStartRatings :rating="product.rating" />
                    </div>
                    <CounterIncDecr :maxNumber="product.stock" @updateCount="updateCount" />
                    <div class="action-footer">
                        <CustomButton class="btn-action" @click="addToCart(product.id)">
                            <template v-slot:text>
                                Agergar al carrito
                            </template>
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { productStore } from '@/store';
import { calculateDiscount } from '../../../helpers'

import CustomCarrousel from '../atoms/CustomCarrousel';
import CustomDetails from '../atoms/CustomDetails';
import CustomStartRatings from '../atoms/CustomStartRatings';
import CustomButton from '../atoms/CustomButton';
import CounterIncDecr from './CounterIncDecr';

const store = productStore();
const route = useRoute();

const idProduct = ref(route.params.id);
const product = ref({});
const quantity = ref(1);

onMounted(async () => {
  try {
    const productById = await store.productById({idProduct: idProduct.value});
    if (!!productById.discountPercentage === true) productById.priceTotal = calculateDiscount({price: productById.price, percentage: productById.discountPercentage}).toFixed(2);
   
    product.value = productById;
  } catch (error) {
    console.error(error);
  }
});

function updateCount (newCount) {
    quantity.value = newCount
}

function addToCart(idProduct) {
    store.addProductCart({idProduct, quantity: quantity.value});
}
</script>

<style scoped>
.content {
    display: grid;
    align-content: center;
    margin: 10% 0px;
}

.card-product {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-gap: 40px;
    justify-content: center;
}

.card-slider {
    width: 100%;
}

.card-content {
    height: 380px;
    position: relative;
    padding: 20px;
    background-color: #f2f2f2;
    -webkit-box-shadow: 8px 5px 48px 8px rgba(0,0,0,0.14);
    -moz-box-shadow: 8px 5px 48px 8px rgba(0,0,0,0.14);
    box-shadow: 8px 5px 48px 8px rgba(0,0,0,0.14);
}

.card-footer {
    margin-top: 40px;
}

.content-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.category-product {
    background-color: #47c49a;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
}

.action-footer {
    margin-top: 45px;
}

.btn-action {
    width: 100%;
    padding-block: 10px;
}
</style>