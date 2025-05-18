<template>
    <el-card class="shadow-sm border border-gray-200 rounded-xl mt-4">
        <template #header>
            <h2 class="text-lg font-semibold text-gray-800">
                📞 Thông tin liên hệ
            </h2>
        </template>

        <!-- Số điện thoại full width -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-600 mb-1">
                Số điện thoại
            </label>
            <el-input
                v-model="props.user.phone"
                placeholder="Nhập số điện thoại"
                class="w-full" />
        </div>

        <!-- Grid cho các trường còn lại -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="mb-4">
                <label class="block mb-1">Tỉnh/Thành phố:</label>
                <el-select
                    v-model="props.user.province"
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

            <div class="mb-4">
                <label class="block mb-1">Quận/Huyện:</label>
                <el-select
                    v-model="props.user.district"
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

            <div class="mb-4">
                <label class="block mb-1">Phường/Xã:</label>
                <el-select
                    v-model="props.user.ward"
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

            <div class="mb-4">
                <label class="block mb-1">Địa chỉ chi tiết:</label>
                <el-input
                    v-model="props.user.detail"
                    placeholder="Số nhà, tên đường..."
                    class="w-full" />
            </div>
        </div>

        <div class="mt-6 text-right items-center">
            <el-button
                type="primary"
                @click="submit"
                :loading="loading"
                class="px-6">
                💾 Lưu thay đổi
            </el-button>
        </div>
    </el-card>
</template>


<script lang="ts">
import { onMounted } from 'vue';
import { useAddressStore } from '@/stores/addressStore';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { reactive, watch, ref } from 'vue';
import { usersApi } from '@/api/usersApi';
import { ElMessage } from 'element-plus';

export default {
    props: ['user'],
    setup(props) {
        const { t } = useI18n();
        const addressStoreInstance = useAddressStore();
        const { provinces, districts, wards } =
            storeToRefs(addressStoreInstance);
        const { fetchProvinces, fetchDistricts, fetchWards } =
            addressStoreInstance;
        const loading = ref(false);

        const onProvinceChange = (code: string) => {
            props.user.district = '';
            props.user.ward = '';
            districts.value = [];
            wards.value = [];
            if (code) fetchDistricts(code);
        };

        const onDistrictChange = (code: string) => {
            props.user.ward = '';
            wards.value = [];
            if (code) fetchWards(code);
        };

        const submit = async () => {
            loading.value = true;
            try {
                await usersApi.updateProfile({
                    phone: props.user.phone,
                    province: props.user.province,
                    district: props.user.district,
                    ward: props.user.ward,
                    detail: props.user.detail,
                });
                ElMessage.success('✅ Thông tin liên hệ đã được cập nhật!');
            } catch (err) {
                console.error(err);
                ElMessage.error('❌ Lỗi khi cập nhật thông tin liên hệ');
            } finally {
                loading.value = false;
            }
        };

        return {
            loading,
            props,
            provinces,
            districts,
            wards,
            onProvinceChange,
            onDistrictChange,
            submit,
        };
    },
};
</script>
