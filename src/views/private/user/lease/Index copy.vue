<template>
    <div class="min-h-screen bg-white">
        <!-- Top Navigation -->
        <TopNav />

        <div class="max-w-4xl mx-auto px-4 py-6">
            <!-- Tiêu đề chính -->
            <h1 class="text-2xl font-semibold mb-6">Tạo chỗ ở cho thuê</h1>

            <!-- Step Indicator -->
            <div class="flex justify-between items-center mb-10">
                <div
                    v-for="n in 8"
                    :key="n"
                    class="flex flex-col items-center flex-1 relative">
                    <!-- Line connector -->
                    <div
                        v-if="n !== 1"
                        class="absolute top-4 left-0 w-full h-0.5 z-0"
                        :class="step > n ? 'bg-pink-500' : 'bg-gray-200'"></div>

                    <div
                        class="z-10 w-9 h-9 flex items-center justify-center rounded-full text-white text-sm font-medium"
                        :class="
                            step === n
                                ? 'bg-pink-500'
                                : step > n
                                ? 'bg-green-500'
                                : 'bg-gray-300'
                        ">
                        {{ n }}
                    </div>
                    <div class="text-xs text-center mt-2">
                        {{ stepLabels[n - 1] }}
                    </div>
                </div>
            </div>

            <!-- Tiêu đề bước hiện tại -->
            <h2 class="text-xl font-semibold mb-4">
                {{ stepLabels[step - 1] }}
            </h2>

            <!-- Nội dung theo bước -->
            <div v-if="!step8Done">
                <div class="mb-8">
                    <component :is="currentStepComponent" :form="form" />
                </div>

                <!-- Nút điều hướng -->
                <div class="flex justify-between">
                    <button
                        class="px-4 py-2 rounded bg-gray-300 text-black"
                        :disabled="step === 1"
                        @click="previewFunction">
                        Quay lại
                    </button>

                    <div>
                        <button
                            v-if="step < 8"
                            class="px-4 py-2 rounded bg-pink-500 text-white"
                            @click="nextFunction">
                            Tiếp tục
                        </button>
                        <button
                            v-else
                            class="px-4 py-2 rounded bg-green-600 text-white"
                            @click="submitFunction">
                            Đăng phòng
                        </button>
                    </div>
                </div>
            </div>

            <!-- Trang thành công -->
            <div v-else>
                <Success />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
import TopNav from '@/views/layout/topnav/Index.vue';
import Step1Basic from './components/Step1Basic.vue';
import Step2Location from './components/Step2Location.vue';
import Step3Amenities from './components/Step3Amenities.vue';
import Step4Photos from './components/Step4Photos.vue';
import Step5Pricing from './components/Step5Pricing.vue';
import Step6Availability from './components/Step6Availability.vue';
import Step7Booking from './components/Step7Booking.vue';
import Step8Review from './components/Step8Review.vue';
import Success from './components/Success.vue';

export default {
    components: {
        TopNav,
        Step1Basic,
        Step2Location,
        Step3Amenities,
        Step4Photos,
        Step5Pricing,
        Step6Availability,
        Step7Booking,
        Step8Review,
        Success,
    },
    setup() {
        const step = ref(1);
        const step8Done = ref(false);

        const stepLabels = [
            'Thông tin cơ bản',
            'Vị trí',
            'Tiện nghi',
            'Hình ảnh',
            'Giá & chính sách',
            'Lịch cho thuê',
            'Cài đặt đặt phòng',
            'Xác nhận',
        ];

        const form = ref({
            propertyType: '',
            location: '',
            amenities: [],
            photos: [],
            pricing: {},
            availability: {},
            bookingOptions: {},
            review: {},
        });

        const nextFunction = () => {
            if (step.value < 8) step.value++;
        };

        const previewFunction = () => {
            if (step.value > 1) step.value--;
        };

        const submitFunction = () => {
            console.log('Dữ liệu gửi:', form.value);
            step8Done.value = true;
        };

        const currentStepComponent = computed(() => {
            const components = [
                Step1Basic,
                Step2Location,
                Step3Amenities,
                Step4Photos,
                Step5Pricing,
                Step6Availability,
                Step7Booking,
                Step8Review,
            ];
            return components[step.value - 1];
        });

        return {
            step,
            stepLabels,
            step8Done,
            form,
            nextFunction,
            previewFunction,
            submitFunction,
            currentStepComponent,
        };
    },
};
</script>
