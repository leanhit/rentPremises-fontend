<template>
    <div class="flex justify-center mt-6 relative">
        <div
            class="flex gap-2 items-center border rounded-full shadow-md px-4 py-2 w-full max-w-2xl bg-white relative z-10">
            <div
                class="text-sm font-semibold px-3 border-r flex-1 cursor-pointer"
                @click="closeAll">
                Điểm đến
            </div>

            <div
                class="text-sm font-semibold px-3 border-r flex-1 text-gray-500 cursor-pointer relative"
                @click.stop="toggleDateDropdown">
                Thêm ngày
                <div
                    v-if="showDateDropdown"
                    class="absolute top-full left-0 w-[300px] mt-2 bg-white p-4 shadow-lg rounded-xl">
                    <input
                        type="date"
                        v-model="startDate"
                        class="border p-2 rounded w-full mb-2" />
                    <input
                        type="date"
                        v-model="endDate"
                        class="border p-2 rounded w-full" />
                </div>
            </div>

            <div
                class="text-sm font-semibold px-3 flex-1 text-gray-500 cursor-pointer relative"
                @click.stop="toggleGuestDropdown">
                Thêm khách
                <div
                    v-if="showGuestDropdown"
                    class="absolute top-full right-0 w-[250px] mt-2 bg-white p-4 shadow-lg rounded-xl">
                    <div class="flex justify-between items-center mb-3">
                        <span>Người lớn</span>
                        <div class="flex items-center gap-2">
                            <button
                                @click="guests = Math.max(guests - 1, 0)"
                                class="bg-gray-200 px-2 rounded">
                                -
                            </button>
                            <span>{{ guests }}</span>
                            <button
                                @click="guests++"
                                class="bg-gray-200 px-2 rounded">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <button class="bg-pink-600 text-white rounded-full p-2">🔍</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showDateDropdown = ref(false);
const showGuestDropdown = ref(false);
const startDate = ref('');
const endDate = ref('');
const guests = ref(0);

function toggleDateDropdown() {
    showDateDropdown.value = !showDateDropdown.value;
    showGuestDropdown.value = false;
}

function toggleGuestDropdown() {
    showGuestDropdown.value = !showGuestDropdown.value;
    showDateDropdown.value = false;
}

function closeAll() {
    showDateDropdown.value = false;
    showGuestDropdown.value = false;
}
</script>
