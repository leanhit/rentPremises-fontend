<script lang="ts" src="@/scripts/public/register/step2PersonalInfo.ts"></script>

<template>
    <div class="form-step-child">
        <div class="form-step-group">
            <label for="fullName">Họ và tên</label>
            <input
                v-model="fullName"
                type="text"
                id="fullName"
                name="fullName"
                class="form-step-inp"
                required
                placeholder="Nhập họ và tên" />
        </div>

        <div class="form-step-group">
            <label>Ngày sinh</label>
            <div class="form-step-date-row">
                <select v-model="selectedDay" class="form-step-inp" required>
                    <option value="">Ngày</option>
                    <option v-for="day in daysInMonth" :key="day" :value="day">{{ day }}</option>
                </select>

                <select v-model="selectedMonth" class="form-step-inp" required>
                    <option value="">Tháng</option>
                    <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
                </select>

                <select v-model="selectedYear" class="form-step-inp" required>
                    <option value="">Năm</option>
                    <option v-for="year in yearOptions" :key="year" :value="year">{{ year }}</option>
                </select>
            </div>
        </div>

        <div class="form-step-group">
            <label for="gender">Giới tính</label>
            <select
                v-model="gender"
                id="gender"
                name="gender"
                class="form-step-inp"
                required>
                <option value="">Chọn giới tính</option>
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
            </select>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/views/public/styles/step.scss';

.form-step-date-row {
    display: flex;
    gap: 8px;
}
</style>
