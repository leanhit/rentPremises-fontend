<template>
    <div class="min-h-screen bg-white">
        <!-- Top Navigation -->
        <TopNav />

        <!-- Search Bar -->
        <!-- <div class="p-4">
            <SearchBar />
        </div> -->

        <!-- Filter Bar -->
        <!-- <div class="px-4">
            <FilterBar />
        </div> -->

        <!-- Stay List -->
        <div class="p-4">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <StayCard v-for="stay in stays" :key="stay.id" :stay="stay" />
            </div>
        </div>

        <!-- Pagination nếu cần -->
        <!-- <Pagination /> -->
    </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
// Import các component
import TopNav from './layout/topnav/Index.vue';
import SearchBar from './layout/SearchBar.vue';
import FilterBar from './layout/FilterBar.vue';
import StayCard from './layout/StayCard.vue';

export default {
    components: {
        TopNav,
        SearchBar,
        FilterBar,
        StayCard,
    },
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup(props: any, context: any) {
        // Data danh sách stays
        const stays = reactive([
            {
                id: 1,
                image: 'https://source.unsplash.com/400x300/?house,korea',
                location: 'Wansan-gu, Jeonju',
                distance: '2,643 km',
                dateRange: '13 – 18 tháng 6',
                price: 291739,
                rating: 4.97,
                isFavorite: true,
            },
            {
                id: 2,
                image: 'https://source.unsplash.com/400x300/?hanok,traditional',
                location: 'Ongryong-myeon, Gwangyang-si',
                distance: '2,633 km',
                dateRange: '6 – 11 tháng 6',
                price: 123795,
                rating: 4.97,
                isFavorite: true,
            },
            {
                id: 3,
                image: 'https://source.unsplash.com/400x300/?villa,korea',
                location: 'Woldeung-myeon, Suncheon-si',
                distance: '2,618 km',
                dateRange: '14 – 19 tháng 5',
                price: 433328,
                rating: 4.93,
                isFavorite: false,
            },
            {
                id: 4,
                image: 'https://source.unsplash.com/400x300/?korean,house',
                location: 'Jangam-myeon, Buyeo',
                distance: '2,653 km',
                dateRange: '18 – 23 tháng 5',
                price: 415027,
                rating: 4.95,
                isFavorite: false,
            },
            // Bạn thêm stay mới vào đây nếu cần
        ]);
        return {
            stays,
        };
    },
};
</script>
