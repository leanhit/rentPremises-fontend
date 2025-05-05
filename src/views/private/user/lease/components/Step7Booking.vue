<template>
    <div>
        <h2 class="step-title">Cài đặt đặt phòng</h2>
        <label
            ><input
                type="radio"
                value="instant"
                v-model="form.bookingOptions.type" />
            Đặt ngay</label
        >
        <label
            ><input
                type="radio"
                value="request"
                v-model="form.bookingOptions.type" />
            Phê duyệt trước</label
        >

        <label>Số đêm tối thiểu:</label>
        <input
            type="number"
            v-model="form.bookingOptions.minNights"
            class="input" />
    </div>
</template>

<script lang="ts" setup>
defineProps<{ form: any }>();
</script>
