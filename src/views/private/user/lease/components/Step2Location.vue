<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 2: Vị trí</h2>

        <div class="mb-4">
            <label class="block mb-1">Tỉnh/Thành phố:</label>
            <el-select
                v-model="form.province"
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
                v-model="form.district"
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
                v-model="form.ward"
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
                v-model="form.detail"
                placeholder="Số nhà, tên đường..." />
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useAddressStore } from '@/stores/addressStore';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

export default {
    props: ['form'],
    setup(props, { expose }) {
        const { t } = useI18n();
        const addressStoreInstance = useAddressStore();
        const { provinces, districts, wards } =
            storeToRefs(addressStoreInstance);
        const { fetchProvinces, fetchDistricts, fetchWards } =
            addressStoreInstance;

        const onProvinceChange = (code: string) => {
            props.form.district = '';
            props.form.ward = '';
            districts.value = [];
            wards.value = [];
            if (code) fetchDistricts(code);
        };

        const onDistrictChange = (code: string) => {
            props.form.ward = '';
            wards.value = [];
            if (code) fetchWards(code);
        };

        onMounted(() => {
            fetchProvinces();
        });

        const checkBeforeNext = async () => {
            const { province, district, ward, detail } = props.form;
            if (!province || !district || !ward || !detail.trim()) {
                ElMessage.warning('Vui lòng điền đầy đủ thông tin vị trí.');
                return false;
            }
            return true;
        };

        expose({ checkBeforeNext });

        onMounted(() => {
            fetchProvinces();
        });

        return {
            provinces,
            districts,
            wards,
            onProvinceChange,
            onDistrictChange,
        };
    },
};
</script>
