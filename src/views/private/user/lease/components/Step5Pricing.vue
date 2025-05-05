<template>
    <div>
        <h2 class="step-title">Giá & chính sách</h2>
        <label>Giá mỗi đêm (VND):</label>
        <input
            type="number"
            v-model="form.pricing.pricePerNight"
            class="input" />

        <label>Phí dọn dẹp:</label>
        <input type="number" v-model="form.pricing.cleaningFee" class="input" />
    </div>
</template>

<script lang="ts" setup>
defineProps<{ form: any }>();
</script>
