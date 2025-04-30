<template>
    <button
        class="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition">
        <span class="text-2xl">{{ icon }}</span>
        <span class="text-sm font-medium mt-1">{{ label }}</span>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    label: string;
    icon: string;
}>();
</script>
