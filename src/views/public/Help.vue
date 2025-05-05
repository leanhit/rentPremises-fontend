<template>
    <!-- Top Navigation -->
    <TopNav />
    
    <div class="max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-bold mb-4 text-gray-800">Trợ giúp</h1>
        <p class="text-gray-600 mb-6">
            Dưới đây là một số câu hỏi thường gặp và thông tin hữu ích để bạn sử
            dụng ứng dụng hiệu quả hơn.
        </p>

        <div
            v-for="(item, index) in faqs"
            :key="index"
            class="mb-4 border rounded-lg shadow-sm">
            <button
                class="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none flex justify-between items-center"
                @click="toggleFAQ(index)">
                <span class="font-medium text-gray-800">{{
                    item.question
                }}</span>
                <span>
                    <svg
                        :class="{ 'rotate-180': item.open }"
                        class="w-5 h-5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div v-if="item.open" class="p-4 text-gray-700 bg-white border-t">
                {{ item.answer }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// Import các component
import TopNav from '@/views/layout/topnav/Index.vue';

const faqs = ref([
    {
        question: 'Làm sao để đăng ký tài khoản?',
        answer: 'Bạn có thể nhấn nút "Đăng ký" ở góc trên cùng và điền thông tin theo các bước hướng dẫn.',
        open: false,
    },
    {
        question: 'Tôi quên mật khẩu thì phải làm sao?',
        answer: 'Bạn hãy nhấn vào "Quên mật khẩu" tại trang đăng nhập để đặt lại mật khẩu.',
        open: false,
    },
    {
        question: 'Tôi có thể thay đổi thông tin cá nhân không?',
        answer: 'Có, vào phần "Tài khoản của tôi" và chọn "Chỉnh sửa thông tin".',
        open: false,
    },
    {
        question: 'Làm sao để liên hệ với hỗ trợ?',
        answer: 'Bạn có thể gửi email tới support@example.com hoặc dùng khung chat hỗ trợ ở góc phải.',
        open: false,
    },
]);

const toggleFAQ = (index) => {
    faqs.value[index].open = !faqs.value[index].open;
};
</script>

<style scoped>
.rotate-180 {
    transform: rotate(180deg);
}
</style>
