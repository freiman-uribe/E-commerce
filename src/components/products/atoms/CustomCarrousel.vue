<template>
 <div>
    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
      <Slide v-for="(image, index) in listImages" :key="index">
        <img :src="image" class="carousel__item" />
      </Slide>
    </Carousel>
    <Carousel
      id="thumbnails"
      :items-to-show="4"
      :wrap-around="true"
      v-model="currentSlide"
      ref="carousel"
    >
      <Slide v-for="(image, index) in listImages" :key="index">
          <img :src="image" class="carousel__item" @click="slideTo(index)" />
      </Slide>
    </Carousel> 
 </div>
</template>
   
<script setup>
import { ref, defineProps, computed } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const props = defineProps({ 
  images: {
    type: Array,
    default: () => [],
    required: true
  }
});

const currentSlide = ref(0);

function slideTo(index) {
    currentSlide.value = index
}

const listImages = computed(() => props.images);
</script>

<style scoped>

.carousel__item {
    width: inherit;
    max-height: 300px;
    object-fit: contain;
}

#thumbnails .carousel__item{
    cursor: pointer;
    width: 80px;
}
</style>