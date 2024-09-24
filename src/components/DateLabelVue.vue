<template>
    
    <label :for="name" class="date__label">
        <div class="relative">
            <input v-if="disabled"
                type="text" 
                class="input date__input"
                :class="{'text-right': !isDateField}"
                :id="name"
                :name="name"
                :value="value"
                :disabled="disabled"
            />
            <input v-else
                type="text" 
                class="input date__input"
                :class="{'text-right': !isDateField}"
                :id="name"
                :name="name"
                v-model="field"
                @input="maskField(isDateField ? 'date' : 'clock')"
                @change="validateField(isDateField ? 'date' : 'clock')"
                :disabled="disabled"
            />
            <img v-if="isDateField" src="/images/calendar.svg" alt="Дата" class="date__icon">
            <img  v-else src="/images/clock.svg" alt="Время" class="date__icon">
            <span v-if="error" class="error text-red-500 absolute top-full" >{{ error }}</span>
        </div>
    </label>
    
</template>

<script setup>
import { ref, computed } from 'vue';
import { useEventsStore } from '@/stores/events';
import { watch } from 'vue';

const eventsStore = useEventsStore();
const props = defineProps({
    name: {
        type: String
    },
    icon: {
        type: String
    },
    value: {
        type: String
    },
    id: {
        type: String,
    },
    disabled: {
        type: Boolean
    }
});

const error = ref('');
const field = ref('');
const isDateField = computed(() => props.icon === 'calendar');


function maskField(type) {

    if(type == 'date') {
        maskDate();
        
    } else if(type == 'clock') {
        maskTime();
    }
    
    eventsStore[props.id] = field.value;
}

function maskDate() {
    let digits = field.value.replace(/\D/g, '');
    digits = digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2}\.\d{2})(\d)/, '$1.$2');
    
    const parts = digits.split('.');
    if (parts[0] && parseInt(parts[0], 10) > 31) {
      parts[0] = '31';  
    }

    if (parts[1] && parseInt(parts[1], 10) > 12) {
      parts[1] = '12';  
    }

    if (parts[2] && parts[2].length === 4 && parseInt(parts[2], 10) > 2100) {
      parts[2] = '2100'; 
    }
    
    field.value = parts.filter(Boolean).join('.');

    if(field.value.length > 10) {
        field.value = field.value.slice(0, field.value.length - 1);
    }
}

function maskTime() {
    let digits = field.value.replace(/\D/g, '');
    digits = digits
    .replace(/^(\d{2})(\d)/, '$1:$2')
    .replace(/^(\d{2}\.\d{2})/, '$1:$2');

    let parts = digits.split(':');
    if(parts[0] > 23) {
        parts[0] = '00';
    }
    if(parts[1] > 59) {
        parts[1] = '00';
    }

    digits = parts.join(':');

    field.value = digits;
    if(field.value.length > 5) {
        field.value = field.value.slice(0, field.value.length - 1);
    }

}

function validateField(type) {
    if(type == 'date') {
        validateDate();
    } else if(type == 'clock') {
        validateTime();
    }
}

function validateDate() {
    if(field.value.length != 10) {
        error.value = 'Введите корректную дату';
        eventsStore.error = error.value;
    } else {
        error.value = '';
    }
}

function validateTime() {
    if(field.value.length < 5) {
        error.value = 'Введите корректное время';
        eventsStore.error = error.value;
    } else {
        error.value = '';
        
    }
}

watch(eventsStore, (newOne) => {
    field.value = newOne[props.id];
});


</script>