<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 5: Giá & Chính sách</h2>

        <div class="mb-4">
            <label class="block mb-1">Giá mỗi đêm (VND):</label>
            <input
                type="number"
                v-model="form.pricing.pricePerNight"
                class="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="VD: 500000" />
        </div>

        <div class="mb-4">
            <label class="block mb-1">Phí dọn dẹp (VND):</label>
            <input
                type="number"
                v-model="form.pricing.cleaningFee"
                class="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="VD: 100000" />
        </div>
    </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';

export default {
    props: ['form'],
    setup(props: any, context: any) {
        const { t } = useI18n();

        const checkBeforeNext = async () => {
            const { pricePerNight, cleaningFee } = props.form.pricing;

            if (!pricePerNight || pricePerNight <= 0) {
                ElMessage.error('Vui lòng nhập giá mỗi đêm hợp lệ');
                return false;
            }

            if (cleaningFee && cleaningFee < 0) {
                ElMessage.error('Phí dọn dẹp không thể âm');
                return false;
            }

            return true;
        };

        context.expose({
            checkBeforeNext,
        });

        return {
            t,
            form: props.form,
        };
    },
};
</script>
