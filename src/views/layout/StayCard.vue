<template>
    <div class="rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
        <div class="relative">
            <img
                :src="stay.image"
                alt="stay image"
                class="w-full h-48 object-cover" />
            <FavoriteBadge v-if="stay.isFavorite" />
        </div>
        <div class="p-4">
            <div class="font-semibold text-lg">{{ stay.location }}</div>
            <DistanceInfo
                :distance="stay.distance"
                :dateRange="stay.dateRange" />
            <div class="flex justify-between items-center mt-2">
                <PriceTag :price="stay.price" />
                <div class="flex items-center gap-1 text-gray-600">
                    ⭐
                    <span>{{ stay.rating }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import FavoriteBadge from './FavoriteBadge.vue';
import PriceTag from './PriceTag.vue';
import DistanceInfo from './DistanceInfo.vue';

defineProps({
    stay: Object,
});
</script>
