<template>
    <div class="flex overflow-x-auto gap-4 pb-4">
        <FilterItem
            v-for="(filter, index) in filters"
            :key="index"
            :label="filter.label"
            :icon="filter.icon" />
    </div>
</template>

<script setup>
import FilterItem from './FilterItem.vue';

const filters = [
    { label: 'Tuyệt vời', icon: '🏡' },
    { label: 'Hồ bơi', icon: '🏊' },
    { label: 'Công viên', icon: '🌳' },
    { label: 'Ven biển', icon: '🏖️' },
    { label: 'Được ưa chuộng', icon: '🔥' },
    { label: 'View đẹp', icon: '🏞️' },
    // thêm các filter khác nếu thích
];
</script>
