import { watch, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { usersApi } from '@/api/usersApi';

export default {
    props: ['form'],
    setup(props: any, context: any) {
        const { t } = useI18n();
        const businessRoles = ref('RENT');

        const validateEmailFormat = (email: string) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        const checkBeforeNext = async () => {
            const { email, phone, address } = props.form;

            if (!email || !phone || !address) {
                ElMessage.warning(
                    t(
                        'Vui lòng nhập đầy đủ email, số điện thoại, địa chỉ và vai trò'
                    )
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
                const res = await usersApi.checkEmail(email); // 👈 dùng checkUsername thay vì checkEmail
                if (res.status !== 200 && res.data === true) {
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

            if (address.length < 5) {
                ElMessage.warning(t('Địa chỉ quá ngắn'));
                return false;
            }

            return true;
        };

        watch(businessRoles, (newValue) => {
            props.form.businessRoles = [newValue]; // 👈 cập nhật form reactive
        });

        context.expose({
            checkBeforeNext,
        });

        return {
            t,
            businessRoles,
            props,
        };
    },
};
