<template>
    <div class="counter-container">
        <div class="counter">
            <CustomButton class="btn btn-decrement" @click="decrement">
                <template v-slot:text>
                    -
                </template>
            </CustomButton>
            <div class="input-quantity">
                <CustomInput  class="input-number" typeInput="number" v-model="value" :value="value" placeholderInput="0"/>
            </div>
            <CustomButton class="btn btn-increment" @click="increment">
                <template v-slot:text>
                    +
                </template>
            </CustomButton>
        </div>
        
        <h6 class="max-value" v-if="!!valueMessage === true">{{ valueMessage }}</h6>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, watch } from 'vue';
import CustomInput from '../atoms/CustomInput';
import CustomButton from '../atoms/CustomButton';

const props = defineProps({
    maxNumber: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(["updateCount"]);

const value = ref(1);
const valueMessage = ref(props.minValue);

watch(value, (newValue, oldValue) => {
    if (props.maxNumber< oldValue) {
        valueMessage.value = 'Has superado la cantidad máxima!';
        value.value = maxNumber.value;
        setTimeout(()=>{
            valueMessage.value = '';
        }, 3000)
    }
    value.value = maxNumber.value >= value.value ? newValue : props.maxNumber;
    emits();
});

const maxNumber = computed(()=> props.maxNumber)

function emits() {
    emit("updateCount", value.value);
}

function increment() {
    if (props.maxNumber >= value.value) value.value++;
    emits();
}

function decrement() {
    if (value.value > 0) value.value--;
    emits();
}
</script>

<style scoped>
.btn {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    margin: 0px;
}

.counter {
    display: flex;
    justify-content: center;
}

.btn-decrement {
 background-color: #f44336;
 color: white;
}

.btn-increment {
 background-color: #4CAF50;
 color: white;
}

.input-quantity {
  margin: 0px 5px;
  display: grid;
}

.input-number {
 width: 50px;
 padding: 5px;
 text-align: center;
 border: 1px solid #ccc;
 border-radius: 5px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button,
input[type="number"] {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
}

.max-value {
    position: absolute;
    margin: 10px;
    color: coral;
    font-size: 16px;
}

</style>