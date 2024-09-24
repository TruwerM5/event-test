<template>
    <div class="date relative">
        <DateListVue />
        <div class="flex flex-row justify-between mb-[10px] gap-[20px]">
            <div class="flex flex-row gap-[20px]">
                <div class="w-[254px] font-semibold">
                    Дата начала
                </div>
                <div class="w-[254px] font-semibold">
                    Время начала
                </div>
            </div>
            
            <div class="flex flex-row gap-[20px]">
                <div class="w-[254px] font-semibold">
                    Дата окончания
                </div>
                <div class="w-[254px] font-semibold">
                    Время окончания
                </div>
            </div>
        </div>
        <div class="flex flex-row justify-between items-center mb-[35px]">
            <div class="date__start flex flex-row gap-[20px]">
                <div class="date__item">
                    <DateLabelVue
                        title="Дата начала"
                        name="date_start"
                        icon="calendar"
                        :value="eventsStore.dateStart"
                        id="dateStart"
                    />
                </div>
                <div class="date__item">
                    <DateLabelVue
                        title="Время начала"
                        name="time_start"
                        :value="eventsStore.timeStart"
                        id="timeStart"
                    />
                </div>
            </div>
            <div class="date__divider">

            </div>
            <div class="date__end flex flex-row gap-[20px]">
                <div class="date__item">
                    <DateLabelVue
                        title="Дата окончания"
                        name="date_end"
                        icon="calendar"
                        :value="eventsStore.dateEnd"
                        id="dateEnd"
                    />
                </div>
                <div class="date__item">
                    <DateLabelVue
                        title="Время окончания"
                        name="time_end"
                        :value="eventsStore.timeEnd"
                        id="timeEnd"
                    />
                </div>
            </div>
        </div>
        <button class="date__add-button" @click="addEventDate">
            + Добавить дату
        </button>
        <span v-if="error" class="text-red-500 font-semibold absolute top-full left-0">{{ error }}</span>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import DateLabelVue from './DateLabelVue.vue';
import DateListVue from './DateListVue.vue';
import { useEventsStore } from '@/stores/events';

const error = ref('');
const eventsStore = useEventsStore();

function addEventDate() {
    let {dateStart, dateEnd, timeStart, timeEnd} = eventsStore;
    if(!dateStart || !dateEnd || !timeStart || !timeEnd) {
        error.value = 'Заполните все поля'
        return;
    }
    error.value = '';
    eventsStore.addEvent({
        id: eventsStore.nextId,
        dateStart, 
        dateEnd,
        timeStart,
        timeEnd
    });
    eventsStore.dateStart = '';
    eventsStore.dateEnd = '';
    eventsStore.timeStart = '';
    eventsStore.timeEnd = '';
    
    eventsStore.nextId++;
}

</script>

<style lang="sass">
.date
    &__item
        width: 254px
    &__subtitle
        display: block
        font-weight: 600
        margin-bottom: 10px
    &__input
        padding: 19px 45px 19px 19px
    &__icon
        position: absolute
        top: 50%
        right: 16px
        transform: translateY(-50%)
    &__divider
        height: 2px
        width: 100%
        background-color: #CDB1FB
        border-radius: 5px
        max-width: 54px
        min-width: 22px
        margin: 0 auto
    &__add-button
        padding: 19px 22px
        border: 1px solid #CDB1FB
        border-radius: 4px
        font-weight: 600
</style>