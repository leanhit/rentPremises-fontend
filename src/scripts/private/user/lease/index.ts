import { ref, computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { leaseApi } from '@/api/leaseApi';

import TopNav from '@/views/layout/topnav/Index.vue';
import StepProgressBar from '@/views/private/user/lease/components/StepProgress.vue';
import Success from '@/views/private/user/lease/components/Success.vue';

import Step1Basic from '@/views/private/user/lease/components/Step1Basic.vue';
import Step2Location from '@/views/private/user/lease/components/Step2Location.vue';
import Step3Amenities from '@/views/private/user/lease/components/Step3Amenities.vue';
import Step4Photos from '@/views/private/user/lease/components/Step4Photos.vue';
import Step5Pricing from '@/views/private/user/lease/components/Step5Pricing.vue';
import Step6Availability from '@/views/private/user/lease/components/Step6Availability.vue';
import Step7Booking from '@/views/private/user/lease/components/Step7Booking.vue';
import Step8Review from '@/views/private/user/lease/components/Step8Review.vue';

export default {
    components: {
        TopNav,
        StepProgressBar,
        Success,
        Step1Basic,
        Step2Location,
        Step3Amenities,
        Step4Photos,
        Step5Pricing,
        Step6Availability,
        Step7Booking,
        Step8Review,
    },
    setup() {
        const { t } = useI18n();
        const step = ref(1);
        const step8Done = ref(false);

        const form = reactive({
            maxGuests: 1,
            propertyType: 'apartment',
            province: '',
            district: '',
            ward: '',
            detail: 'Nhà riêng của tôi',
            amenities: [],
            photos: [],
            pricing: {
                pricePerNight: 0,
                cleaningFee: 0,
            },
            availability: {
                startDate: '',
                endDate: '',
            },
            bookingOptions: {
                type: 'instant',
                minNights: 1,
            },
        });

        const nextFunction = () => {
            if (step.value < 8) step.value++;
        };

        const previewFunction = () => {
            if (step.value > 1) step.value--;
        };

        const buildFormDataFromForm = (form: any): FormData => {
            const formData = new FormData();

            formData.append('maxGuests', String(form.maxGuests));
            formData.append('propertyType', form.propertyType);
            formData.append('province', form.province);
            formData.append('district', form.district);
            formData.append('ward', form.ward);
            formData.append('detail', form.detail);

            form.amenities.forEach((item: string) => {
                formData.append('amenities', item);
            });

            formData.append('pricing.pricePerNight', String(form.pricing.pricePerNight));
            formData.append('pricing.cleaningFee', String(form.pricing.cleaningFee));

            formData.append('availability.startDate', form.availability.startDate);
            formData.append('availability.endDate', form.availability.endDate);

            formData.append('bookingOptions.type', form.bookingOptions.type);
            formData.append('bookingOptions.minNights', String(form.bookingOptions.minNights));

            form.photos.forEach((file: File) => {
                formData.append('photos', file);
            });

            return formData;
        };

        const submitFunction = async () => {
            try {
                console.log('Dữ liệu gửi:', form);

                const formData = buildFormDataFromForm(form);
                const res = await leaseApi.addProperty(formData);

                if (res.status === 200) {
                    step8Done.value = true;
                } else {
                    ElMessage.error(res.data?.message || t('Đã có lỗi xảy ra'));
                }
            } catch (err: any) {
                console.error(err);
                const serverData = err.response?.data;
                let message = '';

                if (typeof serverData === 'string') {
                    message = serverData;
                } else if (serverData?.message) {
                    message = serverData.message;
                } else if (Array.isArray(serverData)) {
                    message = serverData.join(', ');
                } else {
                    message = t('Có lỗi khi gửi dữ liệu');
                }

                ElMessage.error(message);
            }
        };


        const currentStepComponent = computed(() => {
            const steps = [
                Step1Basic,
                Step2Location,
                Step3Amenities,
                Step4Photos,
                Step5Pricing,
                Step6Availability,
                Step7Booking,
                Step8Review,
            ];
            return steps[step.value - 1];
        });

        return {
            step,
            step8Done,
            form,
            nextFunction,
            previewFunction,
            submitFunction,
            currentStepComponent,
        };
    },
};
