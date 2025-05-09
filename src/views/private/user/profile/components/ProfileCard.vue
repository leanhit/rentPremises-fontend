<template>
    <div
        class="bg-white shadow rounded-lg p-4 mb-6 flex items-center space-x-4">
        <img :src="user.avatar" class="w-20 h-20 rounded-full object-cover" />
        <div>
            <h3 class="text-lg font-semibold">{{ user.username }}</h3>
            <p class="text-sm text-gray-500">{{ user.email }}</p>
            <p class="text-sm text-gray-500">{{ user.role }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({ user: Object });
</script>
