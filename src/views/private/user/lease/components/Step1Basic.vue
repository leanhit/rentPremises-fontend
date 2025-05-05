<template>
    <div>
        <h2 class="step-title">Thông tin cơ bản</h2>
        <label>Loại chỗ ở:</label>
        <select v-model="form.propertyType" class="input">
            <option value="apartment">Căn hộ</option>
            <option value="house">Nhà riêng</option>
            <option value="private_room">Phòng riêng</option>
        </select>

        <label>Số lượng khách tối đa:</label>
        <input type="number" v-model="form.maxGuests" class="input" />
    </div>
</template>

<script lang="ts" setup>
defineProps<{ form: any }>();
</script>
