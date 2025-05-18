import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia'
import { usersApi } from '@/api/usersApi';
import { useAddressStore } from '@/stores/addressStore';

export default {
    props: {
        form: {
            type: Object,
            required: true,
        },
    },
    setup(props: any, context: any) {
        const { t } = useI18n();
        const addressStoreInstance = useAddressStore();
        const { provinces, districts, wards } = storeToRefs(addressStoreInstance);
        const { fetchProvinces, fetchDistricts, fetchWards } = addressStoreInstance;

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
            onProvinceChange,
            onDistrictChange,
        };
    },
};
