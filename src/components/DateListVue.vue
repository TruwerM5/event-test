<template>
    <div class="dates-list">
        <div class="dates-list__inner py-[20px] px-[26px] bg-[#FAF7FE] relative mb-[40px]"
        v-for="item,i in eventsStore.events" :key="item.id">
            <RemoveBtnVue @click="eventsStore.removeEvent(item.id)" />
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
                        name="date_start"
                        :icon="item.dateStart || item.dateEnd ? 'calendar' : 'clock'"
                        :value="item.dateStart"
                        id="dateStart"
                        disabled
                        
                    />
                </div>
                <div class="date__item">
                    <DateLabelVue
                        name="time_start"
                        :value="item.timeStart"
                        id="timeStart"
                        disabled
                        
                    />
                </div>
            </div>
            <div class="date__divider" style="width: 22px;">

            </div>
            <div class="date__end flex flex-row gap-[20px]">
                <div class="date__item">
                    <DateLabelVue
                        name="date_end"
                        icon="calendar"
                        :value="item.dateEnd"
                        id="dateEnd"
                        disabled
                        
                    />
                </div>
                <div class="date__item">
                    <DateLabelVue
                        name="time_end"
                        :value="item.timeEnd"
                        id="timeEnd"
                        disabled
                        
                    />
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import RemoveBtnVue from './RemoveBtnVue.vue';
import DateLabelVue from './DateLabelVue.vue';
import { useEventsStore } from '@/stores/events';
const eventsStore = useEventsStore();

const props = defineProps({
    items: {
        type: Array
    }
})


</script>

<style lang="sass">

</style>