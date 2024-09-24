<template>
    <h1 class="text-primary text-2xl font-[800] mb-[2.5rem]">Шаг 2</h1>
    <div class="outer step-two">
        <form @submit.prevent class="form">
            <div class="alert flex flex-row items-center gap-[20px] px-[25px] py-[20px] mb-[68px] rounded-[4px]">
                <img src="/images/alert.png" alt="Alert" />
                <p class="alert__text text-lg font-semibold">
                    Проверьте ваше мероприятие на наличие ошибок, если все в порядке - отправляйте на модерацию.
                </p>
            </div>
            <div class="flex flex-row gap-[16px] mb-[30px]">
                <div class="w-[48px] h-[48px] flex items-center justify-center bg-primary text-xl font-semibold text-white">
                    {{ eventsStore.rating }}
                </div>
                <div class="w-[400px]">
                    <h3 class="text-[32px] text-primary font-[800] mb-[32px]">
                        {{ eventsStore.name }}
                        
                    </h3>
                    <div class="flex flex-row gap-[13px]">
                        <img src="/images/location.svg" alt="Location" />
                        <p class="text-xl opacity-60">{{ eventsStore.address }}</p>
                    </div>
                    <div class="flex flex-row gap-[13px]">
                        <img src="/images/calendar.svg" alt="Date" />
                        <p  v-for="event in eventsStore.events" 
                            :key="event.id" 
                            class="text-xl opacity-60"
                        >
                            {{ event.dateStart }},
                            {{ event.dateEnd }}
                        </p>
                    </div>
                    <div class="flex flex-row gap-[13px]">
                        <img src="/images/clock.svg" alt="Time" />
                        <p  v-for="event in eventsStore.events" 
                            :key="event.id"  
                            class="text-xl opacity-60">
                            {{ event.timeStart }},
                            {{ event.timeEnd }}
                        </p>
                    </div>
                    <div class="my-[25px]">
                        <p class="font-semibold mb-[13px]">Контакты</p>
                        <div class="flex flex-row gap-[13px]">
                            <img src="/images/call.svg" alt="Call" />
                            <p class="text-xl opacity-60">
                                {{ eventsStore.phone_number }}
                            </p>
                        </div>
                        <div class="flex flex-row gap-[13px]">
                            <img src="/images/message.svg" alt="Message" />
                            <p class="text-xl opacity-60">
                                {{ eventsStore.email }}
                            </p>
                        </div>
                    </div>
                    <span class="mb-0 block">{{ eventsStore.organizer }}</span>
                    <span class="text-[#8E69CC] text-[10px] block">Организатор мероприятия</span>

                </div>
                <div class="image-wrapper">
                <img 
                    :src="eventsStore.image" 
                    :alt="eventsStore.name" 
                    class="image h-full object-cover max-w-[630px]"
                /> 
            </div>
            </div>
            <p class="description mb-[50px]">
                {{ eventsStore.details }}
            </p>
            <div class="flex flex-row gap-[20px]">
                <RouterLink to="/" class="secondary-button">
                    Назад
                </RouterLink>
                <button class="primary-button">
                    Отправить на модерацию
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useEventsStore } from '@/stores/events';
import { RouterLink } from 'vue-router';
const eventsStore = useEventsStore();


</script>

<style lang="sass" scoped>
.alert
    box-shadow: 0 8px 25px rgba(155, 99, 248, 0.15)
</style>