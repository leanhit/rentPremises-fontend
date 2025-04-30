<template>
    <div class="text-sm text-gray-500 mt-1">
        {{ distance }} - {{ dateRange }}
    </div>
</template>

<script setup>
defineProps({
    distance: String,
    dateRange: String,
});
</script>
