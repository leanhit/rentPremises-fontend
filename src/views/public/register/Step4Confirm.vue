<script lang="ts" src="@/scripts/public/register/step4Confirm.ts"></script>

<template>
    <div class="form-step-child confirm-step">
        <h2 class="confirm-heading">Xác nhận thông tin</h2>

        <div class="confirm-grid">
            <div class="confirm-item">
                <span class="label">Tên người dùng:</span>
                <span class="value">{{ props.form.username }}</span>
            </div>

            <div class="confirm-item">
                <span class="label">Email:</span>
                <span class="value">{{ props.form.email }}</span>
            </div>

            <div class="confirm-item">
                <span class="label">Số điện thoại:</span>
                <span class="value">{{ props.form.phone }}</span>
            </div>

            <div class="confirm-item">
                <span class="label">Địa chỉ:</span>
                <span class="value">{{ props.form.address }}</span>
            </div>

            <div class="confirm-item">
                <span class="label">Giới tính:</span>
                <span class="value">{{
                    props.form.gender === 'MALE' ? 'Nam' : 'Nữ'
                }}</span>
            </div>

            <div class="confirm-item">
                <span class="label">Họ tên:</span>
                <span class="value">{{ props.form.fullName }}</span>
            </div>

            <div class="confirm-item">
                <span class="label">Ngày sinh:</span>
                <span class="value">{{ props.form.dob }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/views/public/styles/step.scss';
</style>
