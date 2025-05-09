<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 6: Lịch cho thuê</h2>

        <div class="mb-4">
            <label class="block mb-1">Ngày bắt đầu:</label>
            <input
                type="date"
                v-model="form.availability.startDate"
                class="w-full border border-gray-300 rounded px-3 py-2" />
        </div>

        <div class="mb-4">
            <label class="block mb-1">Ngày kết thúc:</label>
            <input
                type="date"
                v-model="form.availability.endDate"
                class="w-full border border-gray-300 rounded px-3 py-2" />
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
            const { startDate, endDate } = props.form.availability;

            if (!startDate || !endDate) {
                ElMessage.error(
                    'Vui lòng chọn cả ngày bắt đầu và ngày kết thúc'
                );
                return false;
            }

            if (new Date(startDate) > new Date(endDate)) {
                ElMessage.error(
                    'Ngày bắt đầu phải trước hoặc bằng ngày kết thúc'
                );
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
