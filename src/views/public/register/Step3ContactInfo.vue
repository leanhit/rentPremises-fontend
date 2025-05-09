<script lang="ts" src="@/scripts/public/register/step3ContactInfo.ts"></script>

<template>
    <div class="form-step-child">
        <div class="form-step-group">
            <label for="email">Email</label>
            <input
                v-model="props.form.email"
                type="email"
                id="email"
                name="email"
                class="form-step-inp"
                required
                placeholder="Nhập email" />
        </div>

        <div class="form-step-group">
            <label for="phone">Số điện thoại</label>
            <input
                v-model="props.form.phone"
                type="text"
                id="phone"
                name="phone"
                class="form-step-inp"
                required
                placeholder="Nhập số điện thoại" />
        </div>

        <div class="form-step-group">
            <label for="address">Địa chỉ</label>
            <input
                v-model="props.form.address"
                type="text"
                id="address"
                name="address"
                class="form-step-inp"
                required
                placeholder="Nhập địa chỉ" />
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/views/public/styles/step.scss';
</style>
