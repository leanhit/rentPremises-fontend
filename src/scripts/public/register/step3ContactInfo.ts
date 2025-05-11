import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { usersApi } from '@/api/usersApi';

export default {
    props: {
        form: {
            type: Object,
            required: true,
        },
    },
    setup(props: any, context: any) {
        const { t } = useI18n();

        const provinces = ref([]);
        const districts = ref([]);
        const wards = ref([]);

        const validateEmailFormat = (email: string) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        const checkBeforeNext = async () => {
            const { email, phone, province, district, ward, detail } = props.form;

            if (!email || !phone || !province || !district || !ward || !detail) {
                ElMessage.warning(
                    t('Vui lòng nhập đầy đủ email, số điện thoại, địa chỉ')
                );
                return false;
            }

            if (!validateEmailFormat(email)) {
                ElMessage.warning(t('Email không hợp lệ'));
                return false;
            }

            if (/\s/.test(email)) {
                ElMessage.warning(t('Email không được chứa dấu cách'));
                return false;
            }

            try {
                const res = await usersApi.checkEmail(email);
                if (res.status === 200 && res.data === true) {
                    ElMessage.error(t('Email đã tồn tại'));
                    return false;
                }
            } catch (err) {
                ElMessage.error(t('Có lỗi khi kiểm tra email'));
                return false;
            }

            if (phone.length < 9 || phone.length > 12) {
                ElMessage.warning(t('Số điện thoại không hợp lệ'));
                return false;
            }

            if (!detail || detail.length < 5) {
                ElMessage.warning(t('Địa chỉ quá ngắn'));
                return false;
            }

            return true;
        };

        const fetchProvinces = async () => {
            try {
                const res = await axios.get('https://provinces.open-api.vn/api/p/');
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

        context.expose({
            checkBeforeNext,
        });

        return {
            t,
            props,
            provinces,
            districts,
            wards,
            fetchProvinces,
            fetchDistricts,
            fetchWards,
            onProvinceChange,
            onDistrictChange,
        };
    },
};
