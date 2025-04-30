<template>
    <div class="text-base font-bold">{{ formatPrice(price) }} ₫</div>
</template>

<script setup>
defineProps({
    price: Number,
});

function formatPrice(value) {
    return new Intl.NumberFormat('vi-VN').format(value);
}
</script>
