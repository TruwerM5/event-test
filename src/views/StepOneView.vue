<template>
    <h1 class="text-primary text-2xl font-[800] mb-[2.5rem]">Шаг 1</h1>
    <div class="outer step-one">
        <form class="form" @submit.prevent>
            <div class="mb-[2.5rem]">
                <h5 class="form__title"></h5>
                <LabelVue
                    :placeholder="'Coca-Cola'"
                    :name="'organizer'"
                    :title="'Организатор'" 
                    model="orginizer"
                 />
            </div>
            <div class="mb-[2.5rem]">
                <h5 class="form__title">Контактные данные</h5>
                <div class="flex gap-[20px] ">
                    <LabelVue
                        :title="'Телефон'"
                        :placeholder="'+7 (999) 555-33-22'"
                        name="phone_number" 
                        
                    />
                    <LabelVue
                        :title="'E-mail'"
                        :placeholder="'ivanov@mail.ru'"
                        name="email" 
                    />
                    <LabelVue
                        :title="'Город организатора'"
                        :placeholder="'Казань'"
                        name="city" 
                    />
                </div>
            </div>
            <div class="mb-[2.5rem]">
                <h5 class="form__title">Общая информация</h5>
                <LabelVue
                    title="Название"
                    name="name" 
                />
            </div>
            <div class="mb-[2.5rem]">
                <ImageInputVue />
            </div>
            <div class="mb-[2.5rem]">
                <label for="description" class="label">
                    <span class="label__title">Подробное описание</span>
                    <textarea 
                        name="description" 
                        id="description" 
                        class="input min-h-[193px]"
                        v-model="eventStore.details">

                    </textarea>
                </label>
            </div>
            <div class="mb-[50px]">
                <DateAndTimeVue />
            </div>
            <div class="mb-[50px]">
                <div class="flex flex-row gap-[20px]">
                    <div class="flex flex-col gap-[10px] flex-1">
                        <span class="font-semibold">Рейтинг мероприятия</span>
                        <select 
                          name="rating" 
                          id="rating" 
                          class="input" 
                          v-model="eventStore.rating">
                            <option 
                            v-for="rating,i in eventStore.ratingList"
                            :key="rating.title"
                            :value="rating.title" 
                            >
                                {{ rating.title }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col gap-[10px] flex-1">
                        
                        <LabelVue
                            title="Адрес мероприятия"
                            name="address"
                        />
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-[20px] relative">
                <button class="secondary-button" @click="eventStore.$reset">
                    Отменить
                </button>
                <button class="primary-button text-center" @click="goToNextStep">
                    Далее
                </button>
                <span v-if="eventStore.error" class="absolute text-red-500 top-full font-semibold text-xl">{{ eventStore.error }}</span>
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/events';
import LabelVue from '@/components/LabelVue.vue';
import ImageInputVue from '@/components/ImageInputVue.vue';
import DateAndTimeVue from '@/components/DateAndTimeVue.vue';

const router = useRouter();
const eventStore = useEventsStore();
const selectedRating = ref('');

async function getRate() {
    eventStore.ratingList = await eventStore.getRatings();
    if(eventStore.ratingList.length > 0) {
        eventStore.rating = eventStore.ratingList[0].title;
    }
}

onMounted(() => {
    getRate();
});

function goToNextStep() {
    if(eventStore.validateForm()) {
        return;
    } else {
        router.push('/step-two')

    }
}

</script>

<style lang="sass" scoped>
.form
    &__title
        font-size: 18px
        font-weight: 600
        margin-bottom: 30px

</style>