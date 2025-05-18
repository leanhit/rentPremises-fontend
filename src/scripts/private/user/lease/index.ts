import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import TopNav from '@/views/layout/topnav/Index.vue';
import Step1Basic from '@/views/private/user/lease/components/Step1Basic.vue';
import Step2Location from '@/views/private/user/lease/components/Step2Location.vue';
import Step3Amenities from '@/views/private/user/lease/components/Step3Amenities.vue';
import Step4Photos from '@/views/private/user/lease/components/Step4Photos.vue';
import Step5Pricing from '@/views/private/user/lease/components/Step5Pricing.vue';
import Step6Availability from '@/views/private/user/lease/components/Step6Availability.vue';
import Step7Booking from '@/views/private/user/lease/components/Step7Booking.vue';
import Step8Review from '@/views/private/user/lease/components/Step8Review.vue';
import Success from '@/views/private/user/lease/components/Success.vue';
import StepProgressBar from '@/views/private/user/lease/components/StepProgress.vue';

export default {
    components: {
        TopNav,
        Step1Basic,
        Step2Location,
        Step3Amenities,
        Step4Photos,
        Step5Pricing,
        Step6Availability,
        Step7Booking,
        Step8Review,
        Success,
        StepProgressBar,
    },
    setup() {
        const { t } = useI18n();
        const step = ref(1);
        const step8Done = ref(false);

        const step1Ref = ref(null)
        const step2Ref = ref(null)
        const step3Ref = ref(null)
        const step4Ref = ref(null)
        const step5Ref = ref(null)
        const step6Ref = ref(null)
        const step7Ref = ref(null)
        const step8Ref = ref(null)

        const stepLabels = [
            'Thông tin cơ bản',
            'Vị trí',
            'Tiện nghi',
            'Hình ảnh',
            'Giá & chính sách',
            'Lịch cho thuê',
            'Cài đặt đặt phòng',
            'Xác nhận',
        ];

        const form = reactive({
            propertyType: 'apartment',
            maxGuests: 1,
            province: '',
            district: '',
            ward: '',
            detail: 'Nhà tôi',
            amenities: [],
            photos: [],
            pricing: {
                pricePerNight: 0,
                cleaningFee: 0,
            },
            availability: {
                startDate: '',
                endDate: '',
                minStay: 1,
            },
            bookingOptions: {
                type: 'instant',
                minNights: 1,
            },
            review: {},
        });

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
            } else if (step.value === 4) {
                const isValid = await step4Ref.value?.checkBeforeNext?.();
                if (!isValid) return;
            } else if (step.value === 5) {
                const isValid = await step5Ref.value?.checkBeforeNext?.();
                if (!isValid) return;
            } else if (step.value === 6) {
                const isValid = await step6Ref.value?.checkBeforeNext?.();
                if (!isValid) return;
            } else if (step.value === 7) {
                const isValid = await step7Ref.value?.checkBeforeNext?.();
                if (!isValid) return;
            } else if (step.value === 8) {
                const isValid = await step8Ref.value?.checkBeforeNext?.();
                if (!isValid) return;
            }
            step.value++;
        };

        const previewFunction = () => {
            if (step.value > 1) {
                step.value--;
            } else if (step.value === 8) {
                step8Done.value = false;
            }
        };

        const submitFunction = () => {
            console.log('Dữ liệu gửi:', form.value);
            step8Done.value = true;
        };

        const currentStepComponent = computed(() => {
            const components = [
                Step1Basic,
                Step2Location,
                Step3Amenities,
                Step4Photos,
                Step5Pricing,
                Step6Availability,
                Step7Booking,
                Step8Review,
            ];
            return components[step.value - 1];
        });
        const currentStepRef = computed(() => {
            const refs = [
                step1Ref,
                step2Ref,
                step3Ref,
                step4Ref,
                step5Ref,
                step6Ref,
                step7Ref,
                step8Ref,
            ];
            return refs[step.value - 1];
        });

        return {
            t,
            step,
            stepLabels,
            step8Done,
            form,
            nextFunction,
            previewFunction,
            submitFunction,
            currentStepComponent,
            currentStepRef,
        };
    },
};