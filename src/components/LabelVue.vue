<template>
    <label :for="name" class="label">
        <span class="label__title">{{ title }}</span>
            <input 
                type="text" 
                class="input" 
                :name="name" 
                :id="name" 
                :placeholder="placeholder"
                v-model="eventsStore[name]"
                @change="handleInput"
            />
            <span v-if="error.length > 0" class="error text-rose-600">{{ error }}</span>
    </label>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useEventsStore } from '@/stores/events';

const eventsStore = useEventsStore();

const props = defineProps({
    title: {
        type: String
    },
    name: {
        type: String
    },
    placeholder: {
        type: String
    },
    model: {
        type: String
    }
});

const isEmail = computed(() => props.name == 'email');
const isPhoneNumber = computed(() => props.name == 'phone_number');
const error = ref('');
const field = ref(eventsStore[props.name]);

function handleInput(e) {
    if(isEmail.value) {
        validatedeEmail(e);
        return;
    } else if(isPhoneNumber.value) {
        formatPhoneNumber(e);
        return;
    }
    if(eventsStore[props.name].length < 4) {
        error.value = 'Введите корректные данные';
        eventsStore.error = true;
    } else {
        error.value = '';
        eventsStore.error = false;        
    }
}

function validatedeEmail(e) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(eventsStore[props.name])) {
        error.value = 'Введите корректные данные';
        return error.value;
    } else {
        console.log('Passed');
        // eventsStore[props.name] = field.value;
        error.value = '';
        eventsStore.error = false;
    }
    return null;
}

function formatPhoneNumber(e) {
    
    let cleaned = eventsStore[props.name].replace(/(?!^\+)\D/g, '');
    
    if(cleaned.length == 11 || cleaned.length == 12) {
        if(cleaned.startsWith(8) || cleaned.startsWith(7)) {
        cleaned = `${cleaned.substring(0,1)} (${cleaned.substring(1, 4)}) ${cleaned.substring(4,7)} ${cleaned.substring(7,9)} ${cleaned.substring(9, 11)}`;
        } else if(cleaned.startsWith('+')) {
            cleaned = `${cleaned.substring(0,2)} (${cleaned.substring(2, 5)}) ${cleaned.substring(5,8)} ${cleaned.substring(8,10)} ${cleaned.substring(10, 12)}`;
        }
    } else {
        error.value = 'Введите корректный номер телефона';
        return error.value;
    }
    error.value = '';
    
    
    eventsStore[props.name] = cleaned;
}



</script>

<style lang="sass">
.label
    flex: 1
    &__title
        display: block
        margin-bottom: 10px
        font-weight: 600
</style>