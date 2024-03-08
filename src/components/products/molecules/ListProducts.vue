<template>
  <div>
    <h1 class="title-products">Productos</h1>
    <div class="content-filters">
      <div class="filters" >
        <CustomSelect class="select-filter" v-for="(select, index) in selects" :key="index" :options="select.options" :name="select.name" @change="handleSelectChange">
          <template v-slot:optionDefault>
            <option value="" disabled selected>Selecciona una opcion de {{ select.label }}</option>
          </template>
        </CustomSelect>
      </div>
      <div class="footer-filter">
        <CustomButton class="btn-filter" :disabled="!isDisabledBtnFilter()" @click="filter()">
          <template v-slot:text>
            Filtrar
          </template>
        </CustomButton>
      </div>
    </div>
    
    <div class="card-group">
      <CustomCard :items="paginatedPoducts" />
    </div>
    
    <vue-awesome-paginate
      class="pagination"
      :total-items="totalPages"
      :items-per-page="itemsPerPage"
      :max-pages-shown="3"
      v-model="currentPagee"
      :on-click="onClickHandler"
    >
      <template #prev-button>
        <IconBack/>
      </template>
      <template #next-button>
        <span>
          <IconNext/>
        </span>
      </template>
    </vue-awesome-paginate>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { productStore } from '@/store';
import { objectToArray } from '../../../helpers';

import CustomSelect from '../atoms/CustomSelect';
import CustomButton from '../atoms/CustomButton';
import CustomCard from '../atoms/CustomCard';
import IconBack from '../../../utils/icons/IconBack';
import IconNext from '../../../utils/icons/IconNext';

const store = productStore();

const listProducts = ref([]);
const listFilter = ref([]);
const dataFilter = ref({});
const selects = ref([]);

const itemsPerPage = ref(10);
const currentPagee = ref(1);
const totalPages = ref(100);


onMounted(async () => {
  try {
    await getList();

    const categories = await store.getCategories();
    const brands = await store.getBrand();
 
    await loadFilters({categories, brands});
  } catch (error) {
    console.error(error);
  }
});

const paginatedPoducts = computed(() => {
  return listFilter.value.length ? listFilter.value : listProducts.value;
});

async function onClickHandler(page) {
  const skip = (page * itemsPerPage.value) >= 100 ? 99 : (page * itemsPerPage.value);
  await getList(skip);
}

async function getList(skip) {
  try {
    const list = await store.getList({ limit:itemsPerPage.value, skip });
    listProducts.value = list;
  } catch (error) {
    console.error(error);
  }
}

function loadFilters(dataFilters) {
  const { categories, brands } = dataFilters;

  const optionsCategories = objectToArray(categories);
  const optionsBrads = brands.map(brand => ({id: brand.name, name: brand.name}))
  const optionsPrices = [{id:'asc', name: 'Menor precio'}, {id:'des', name: 'Mayor precio'}];
  const optionsDiscount = [{id:'asc', name: 'Menor descuento'}, {id:'des', name: 'Mayor descuento'}];
  const optionsRating = [{id:'asc', name: 'Menor calificdo'}, {id:'des', name: 'Mayor calificacion'}];
  const optionsStock = [{id:'asc', name: 'Menor stock'}, {id:'des', name: 'Mayor stock'}];

  selects.value = [...selects.value, {label: 'categoría', name:'category', options: optionsCategories}];
  selects.value = [...selects.value, {label: 'precio', name:'price', options: optionsPrices}];
  selects.value = [...selects.value, {label: 'descunto', name:'discountPercentage', options: optionsDiscount}];
  selects.value = [...selects.value, {label: 'popularidad', name:'rating', options: optionsRating}];
  selects.value = [...selects.value, {label: 'stock', name:'stock', options: optionsStock}];
  selects.value = [...selects.value, {label: 'marca', name:'brand', options: optionsBrads}];
}

function handleSelectChange(event) {
  const { name, value } = event.target;

  dataFilter.value = {...dataFilter.value, [name]:value };
}

async function filter() {
  try {
    const data = await store.getProductByfilter(dataFilter.value);
    totalPages.value = Math.ceil(data.length / itemsPerPage.value);
    listFilter.value = data;
  } catch (error) {
    console.error(error);
  }
}

const isDisabledBtnFilter = () => Object.keys(dataFilter.value).length;

</script>

<style>

.title-products {
  font-weight: normal;
}

.content-filters {
  margin: 10px 0px;
}

.filters {
  display: inline-block;
}

.select-filter {
  padding: 10px;
  width: 100%;
  max-width: 350px;
  margin: 10px 0px;
  margin-right: 10px;
  margin: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  flex: 1 0 auto;
}

.footer-filter {
  display: grid;
  width: 100%;
  justify-content: center;
}

.btn-filter {
  width: 300px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
}

.btn-filter:hover {
  background-color: #038080;
}

.card-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  max-width: 300px;
  min-width: 18%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-body {
  margin-bottom: 20px;
}

.content-name,
.content-price {
  margin-bottom: 10px;
}

.name,
.price {
  font-size: 18px;
}

.button {
  float: right;
  margin-bottom: 10px;
}

.pagination {
  float: inline-end;
}

.pagination-container {
  display: flex;
  column-gap: 2px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #00b3b3;
  border: 1px solid #00b3b3;
  color: white;
}
.active-page:hover {
  background-color: #00b3b3;
}
</style>