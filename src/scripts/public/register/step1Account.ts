import { useI18n } from 'vue-i18n';
import { ref, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { usersApi } from '@/api/usersApi';

export default {
    props: ['form'],
    setup(props: any, context: any) {
        const { t } = useI18n();
        const { username, password } = toRefs(props.form);
        const repassword = ref('123');

        const showPassword = ref(false);
        const showRepassword = ref(false);

        // ✅ Hàm kiểm tra từng input
        const checkBeforeNext = async () => {
            if (!username.value) {
                ElMessage.warning(t('Vui lòng nhập Username'));
                return false;
            }

            if (/\s/.test(username.value)) {
                ElMessage.warning(t('Username không được chứa dấu cách'));
                return false;
            }

            try {
                const res = await usersApi.checkUsername(username.value); // 👈 dùng checkUsername thay vì checkEmail
                if (res.status === 200 && res.data === true) {
                    ElMessage.error(t('Username đã tồn tại'));
                    return false;
                }
            } catch (err) {
                ElMessage.error(t('Có lỗi khi kiểm tra Username'));
                return false;
            }

            if (!password.value) {
                ElMessage.warning(t('Vui lòng nhập Password'));
                return false;
            }

            if (!repassword.value) {
                ElMessage.warning(t('Vui lòng nhập lại Password'));
                return false;
            }

            if (password.value !== repassword.value) {
                ElMessage.error(t('Mật khẩu nhập lại không đúng'));
                return false;
            }

            return true;
        };

        context.expose({
            checkBeforeNext,
        });

        return {
            t,
            username,
            password,
            repassword,
            showPassword,
            showRepassword,
        };
    },
};
