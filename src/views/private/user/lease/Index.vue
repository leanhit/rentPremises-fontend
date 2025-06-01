<template>
    <div class="min-h-screen bg-white">
        <!-- Top Navigation -->
        <TopNav />

        <div class="max-w-4xl mx-auto px-4 py-6">
            <!-- Tiêu đề chính -->
            <h1 class="text-2xl font-semibold mb-6">Tạo chỗ ở cho thuê</h1>

            <!-- Step Indicator -->
            <StepProgressBar :step="step" :step8Done="step8Done" />

            <!-- Nội dung theo bước -->
            <div v-if="!step8Done">
                <div class="mb-8">
                    <component :is="currentStepComponent" :form="form" />
                </div>

                <!-- Nút điều hướng -->
                <div class="flex justify-center space-x-4 mt-4">
                    <button
                        class="px-4 py-2 rounded bg-gray-300 text-black"
                        :disabled="step === 1"
                        @click="previewFunction">
                        Quay lại
                    </button>

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

            <!-- Trang thành công -->
            <div v-else>
                <Success />
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="@/scripts/private/user/lease/index.ts"></script>
