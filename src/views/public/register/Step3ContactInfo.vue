<script lang="ts" src="@/scripts/public/register/step3ContactInfo.ts"></script>

<template>
    <div class="form-step-child">
        <!-- Email + Phone -->
        <div class="flex flex-col md:flex-row gap-4 mb-1">
            <div class="form-step-group flex-1 min-w-[200px]">
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

            <div class="form-step-group flex-1 min-w-[200px]">
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
        </div>

        <!-- Địa chỉ -->
        <div class="form-step-group">
            <label for="address">Địa chỉ</label>

            <!-- Tỉnh / Huyện / Xã -->
            <div class="flex flex-col md:flex-row flex-wrap gap-4 mb-4">
                <div class="flex-1 min-w-[200px]">
                    <label class="block mb-1">Tỉnh/Thành phố:</label>
                    <el-select
                        v-model="props.form.province"
                        placeholder="Chọn tỉnh/thành"
                        filterable
                        @change="onProvinceChange"
                        class="w-full">
                        <el-option
                            v-for="item in provinces"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code" />
                    </el-select>
                </div>

                <div class="flex-1 min-w-[200px]">
                    <label class="block mb-1">Quận/Huyện:</label>
                    <el-select
                        v-model="props.form.district"
                        placeholder="Chọn quận/huyện"
                        filterable
                        @change="onDistrictChange"
                        class="w-full"
                        :disabled="!districts.length">
                        <el-option
                            v-for="item in districts"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code" />
                    </el-select>
                </div>

                <div class="flex-1 min-w-[200px]">
                    <label class="block mb-1">Phường/Xã:</label>
                    <el-select
                        v-model="props.form.ward"
                        placeholder="Chọn phường/xã"
                        filterable
                        class="w-full"
                        :disabled="!wards.length">
                        <el-option
                            v-for="item in wards"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code" />
                    </el-select>
                </div>
            </div>

            <!-- Chi tiết địa chỉ -->
            <div class="mb-4">
                <label class="block mb-1">Địa chỉ chi tiết:</label>
                <el-input
                    v-model="props.form.detail"
                    placeholder="Số nhà, tên đường..." />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/views/public/styles/step.scss';
</style>
