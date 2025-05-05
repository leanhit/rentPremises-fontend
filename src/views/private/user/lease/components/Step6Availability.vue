<template>
    <div>
        <h2 class="step-title">Lịch cho thuê</h2>
        <label>Ngày bắt đầu:</label>
        <input
            type="date"
            v-model="form.availability.startDate"
            class="input" />

        <label>Ngày kết thúc:</label>
        <input type="date" v-model="form.availability.endDate" class="input" />
    </div>
</template>

<script lang="ts" setup>
defineProps<{ form: any }>();
</script>
