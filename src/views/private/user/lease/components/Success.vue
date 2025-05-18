<template>
    <div class="text-center p-6">
        <h2 class="text-2xl font-bold text-green-600">
            🎉 Đăng phòng thành công!
        </h2>
        <p class="mt-4">
            Cảm ơn bạn đã chia sẻ không gian của mình. Phòng sẽ hiển thị sau khi
            được duyệt.
        </p>

        <div class="mt-6 flex justify-center gap-4">
            <router-link
                to="/"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
                Về trang chủ
            </router-link>
            <router-link
                to="/my-leases"
                class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
                Danh sách cho thuê của tôi
            </router-link>
        </div>
    </div>
</template>

<script lang="ts" setup></script>
