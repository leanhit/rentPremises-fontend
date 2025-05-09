<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 2: Vị trí</h2>

        <div class="mb-4">
            <label class="block mb-1">Tỉnh/Thành phố:</label>
            <el-select
                v-model="form.location.province"
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
                v-model="form.location.district"
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
                v-model="form.location.ward"
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
                v-model="form.location.detail"
                placeholder="Số nhà, tên đường..." />
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
    props: ['form'],
    setup(props, { expose }) {
        const provinces = ref([]);
        const districts = ref([]);
        const wards = ref([]);

        const fetchProvinces = async () => {
            try {
                const res = await axios.get(
                    'https://provinces.open-api.vn/api/p/'
                );
                provinces.value = res.data;
            } catch (err) {
                ElMessage.error('Không thể tải tỉnh/thành phố');
            }
        };

        const fetchDistricts = async (provinceCode: string) => {
            try {
                const res = await axios.get(
                    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
                );
                districts.value = res.data.districts || [];
            } catch (err) {
                ElMessage.error('Không thể tải quận/huyện');
            }
        };

        const fetchWards = async (districtCode: string) => {
            try {
                const res = await axios.get(
                    `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
                );
                wards.value = res.data.wards || [];
            } catch (err) {
                ElMessage.error('Không thể tải phường/xã');
            }
        };

        const onProvinceChange = (code: string) => {
            props.form.location.district = '';
            props.form.location.ward = '';
            districts.value = [];
            wards.value = [];
            if (code) fetchDistricts(code);
        };

        const onDistrictChange = (code: string) => {
            props.form.location.ward = '';
            wards.value = [];
            if (code) fetchWards(code);
        };

        const checkBeforeNext = async () => {
            const { province, district, ward, detail } = props.form.location;
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
