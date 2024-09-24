<template>
    <div class="image relative flex flex-col gap-[10px]">
        <span class="image__title mb-[20px] font-semibold">Фотография</span>
        <div v-if="imageObj" class="image__preview relative px-[10px] w-[146px] h-[126px]">
            <img :src="imageObj" alt="Uploaded image" class="min-w-full min-h-full object-cover">
            <RemoveBtnVue @click="removeImage" />
        </div>
        <div v-else class="image-empty px-[10px]">
            <button class="image__button">
                <img src="/images/camera.png" alt="Upload a photo" class="absolute z-0" />
                <input 
                    type="file" 
                    name="image" 
                    id="image" 
                    class="absolute z-10 w-full h-full opacity-0 cursor-pointer" 
                    @change="onImageUpload"
                />
            </button>
        </div>
        <span class="image__subtitle text-[14px] max-w-[126px]">Главная фотография (обложка мероприятия)</span>
        <span v-if="error" class="error" >{{ error }}</span>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useEventsStore } from '@/stores/events';
import RemoveBtnVue from './RemoveBtnVue.vue';

const eventsStore = useEventsStore();
const file = ref(null);
const imageObj = ref(null);
const error = ref(null);

function onImageUpload(e) {
    file.value = e.target.files[0];
    imageObj.value = URL.createObjectURL(file.value);
    eventsStore.image = imageObj.value;
    eventsStore.error = false;
}

function removeImage() {
    file.value = null;
    imageObj.value = null;
    eventsStore.image = null;
    error.value = 'Загрузите фотографию';
    eventsStore.error = true;
}

</script>

<style lang="sass" scoped>
.image
    &__button
        position: relative
        width: 126px
        height: 126px
        display: flex
        justify-content: center
        align-items: center
        border: 4px solid #CDB1FB
        background-color: #F8F8FE
        border-radius: 4px
        z-index: 10
</style>