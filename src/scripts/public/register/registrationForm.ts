import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref, reactive } from 'vue';
import { usersApi } from '@/api/usersApi';
import { ElMessage } from 'element-plus';

import Step2PersonalInfo from '@/views/public/register/Step2PersonalInfo.vue';
import Step1Account from '@/views/public/register/Step1Account.vue';
import Step3ContactInfo from '@/views/public/register/Step3ContactInfo.vue';
import Step4Confirm from '@/views/public/register/Step4Confirm.vue';
import Success from '@/views/public/register/Success.vue';

export default {
    components: {
        Step1Account,
        Step2PersonalInfo,
        Step3ContactInfo,
        Step4Confirm,
        Success,
    },
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup(props: any, context: any) {
        const router = useRouter(); // 👈 lấy instance router
        const authStore = useAuthStore();
        const { t } = useI18n();
        const step1Ref = ref(null)
        const step2Ref = ref(null)
        const step3Ref = ref(null)
        const step = ref(1);
        const step4Done = ref(false);
        const form = reactive({
            email: 'theanh.it@gmail.com',
            password: '123',
            role: 'USER', // Vai trò mặc định là 'USER'
            username: 'theanh.it', // Tên đăng nhập
            fullName: 'Lê Thế Anh', // Họ và tên
            dateOfBirth: '', // Ngày sinh
            phone: '0976218203', // Số điện thoại
            province: '',
            district: '',
            ward: '',
            detail: 'nhà tôi',
            gender: 'OTHER', // Giới tính
        });

        const previewFunction = () => {
            if (step.value > 1) {
                step.value--;
            } else if (step.value === 4) {
                step4Done.value = false;
            }
        };

        const nextFunction = async () => {
            if (step.value === 1) {
                const isValid = await step1Ref.value?.checkBeforeNext?.();
                if (!isValid) return;
            } else if (step.value === 2) {
                const isValid = await step2Ref.value?.checkBeforeNext?.();
                if (!isValid) return;
            } else if (step.value === 3) {
                const isValid = await step3Ref.value?.checkBeforeNext?.();
                if (!isValid) return;
            }

            step.value++;
        };

        const submitFunction = async () => {
            try {
                const res = await usersApi.register(form);
                if (res.status === 200) {
                    const token = res.data.token;
                    const user = res.data.user; // Giả sử trong response đã có user info và role

                    authStore.login(token, user); // ✅ Gọi store login

                    // 👇 redirect bằng router.push()
                    if (form.role === 'ADMIN') {
                        router.push('/admin/dashboard');
                    } else if (form.role === 'USER') {
                        router.push('/');
                    } else {
                        router.push('/login');
                    }
                    step4Done.value = true;
                } else {
                    ElMessage.error(t(res.message));
                }
            } catch (err) {
                ElMessage.error(t('Có lỗi khi đăng ký tài khoản'));
                return false;
            }
        };

        return {
            t,
            step,
            form,
            nextFunction,
            previewFunction,
            submitFunction,
            step4Done,
            step1Ref,
            step2Ref,
            step3Ref
        };
    },
};
