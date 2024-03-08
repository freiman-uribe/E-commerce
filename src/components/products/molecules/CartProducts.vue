<template>
  <div class="cart">
    <div class="cart-button-container">
        <CustomButton class="cart-button" @click="togglePanel">
          <template v-slot:icon> 
            <IconCart/>
          </template>
          <template v-slot:text>
            <span class="quantity">{{ contenrCart.totalQuantity}}</span>
          </template>
        </CustomButton>
    </div>
    <transition name="slide-fade" appear>
      <CustomSidePanel v-if="isPanelOpen">
        <template v-slot:content> 
          
          <CustomButton class="cart-close" @click="togglePanel">
            <template v-slot:text>
              X
            </template>
          </CustomButton>
          <div class="content" >
            <CartProductsDetails/>
          </div>
        </template> 
      </CustomSidePanel>
    </transition>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { productStore } from '@/store';

import CustomButton from '../atoms/CustomButton'
import CustomSidePanel from '../atoms/CustomSidePanel'
import CartProductsDetails from './CartProductsDetails';

import IconCart from '../../../utils/icons/IconCart';
// import IconDelete from '../../../utils/icons/IconDelete';

const store = productStore();

const isPanelOpen = ref(false);
const contenrCart = ref([]);

onMounted(async () => {
  try {
    const list = await store.getCart();
    contenrCart.value = list
  } catch (error) {
    console.error(error);
  }
});

async function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value;
  const list = await store.getCart();
  contenrCart.value = list;
}
</script>

<style>
.cart {
  margin-top: 10px;
  position: relative;
}

.cart-button-container {
  position: absolute;
  display: inline-block;
  padding: 5px 15px;
  top: 15px;
  right: 10px;
}

.cart-button {
  position: relative;
  padding: 5px 10px;
  border-radius: 5px;
}

.cart-button svg {
  fill: #fff;
}

.quantity {
  position: absolute;
  top: -10px;
  left: 30px;
  height: 15px;
  min-width: 15px;
  max-width: 100%;
  background-color: #f00;
  color: #fff;
  border-radius: 50%;
  padding: 5px;
  font-size: 12px;
  font-weight: 600;
  
}
.panel-lateral {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(90, 90, 90, 0.301);
  z-index: 100;
}

.panel-content {
  width: 300px;
  background: #fff;
  height: 100%;
  float: right;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.content {
  margin: 10px;
}

.list-products {
 list-style-type: none;
 padding: 0;
 margin: 0;
}

.item-product {
 display: flex;
 align-items: center;
 margin-top: 23px;
 padding: 10px;
 border: 1px solid #ccc;
 border-radius: 5px;
}

.item-product img {
 margin-right: 10px;
}

.item-product span {
 margin-right: 10px;
}

.footer {
  margin-top: 20px;
  text-align: end;
  border-top: 1px solid;
}

.total {
 font-size: 18px;
 display: block;
 margin-top: 20px;
}

.not-cart {
  margin: 100px 0px;
  text-align: center;
}
</style>