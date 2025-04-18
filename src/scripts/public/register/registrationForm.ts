import { useI18n } from 'vue-i18n';
import { ref, reactive } from 'vue';
import { computed } from 'vue';
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
        const { t } = useI18n();
        const step1Ref = ref(null)
        const step2Ref = ref(null)
        const step3Ref = ref(null)
        const step4Ref = ref(null)
        const step = ref(1);
        const step4Done = ref(false);
        const form = reactive({
            email: 'theanh.it@gmail.com',
            password: '123',
            role: 'RENT', // Vai trò mặc định là 'RENT'
            username: 'theanh.it', // Tên đăng nhập
            fullName: 'Lê Thế Anh', // Họ và tên
            dob: '', // Ngày sinh
            phone: '0976218203', // Số điện thoại
            address: 'nhà tôi', // Địa chỉ
            gender: 'OTHER', // Giới tính
        });

        console.log('form', form);

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
            else if (step.value === 4) {
                const isValid = await step4Ref.value?.checkBeforeNext?.();
                if (!isValid) return;
            }

            if (step.value < 5) {
                step.value++;
            }
        };

        const submitFunction = () => {
            step4Done.value = true;
        };

        const containerStyle = computed(() => {
            return {
                left: `-${(step.value - 1) * 100}%`,
                transform: `translateX(-${(step.value - 1) * 100}%)`,
            };
        });

        return {
            t,
            step,
            form,
            nextFunction,
            previewFunction,
            submitFunction,
            containerStyle,
            step4Done,
            step1Ref,
            step2Ref,
            step3Ref,
            step4Ref,
        };
    },
};
