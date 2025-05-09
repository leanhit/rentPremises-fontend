<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 7: Cài đặt đặt phòng</h2>

        <div class="mb-4">
            <label class="block mb-2">
                <input
                    type="radio"
                    value="instant"
                    v-model="form.bookingOptions.type"
                    class="mr-2" />
                Đặt ngay
            </label>

            <label class="block mb-4">
                <input
                    type="radio"
                    value="request"
                    v-model="form.bookingOptions.type"
                    class="mr-2" />
                Phê duyệt trước
            </label>
        </div>

        <div class="mb-4">
            <label class="block mb-1">Số đêm tối thiểu:</label>
            <input
                type="number"
                v-model="form.bookingOptions.minNights"
                class="w-full border border-gray-300 rounded px-3 py-2"
                :min="1"
                placeholder="Nhập số đêm tối thiểu" />
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
            const { type, minNights } = props.form.bookingOptions;

            if (!type) {
                ElMessage.error(
                    'Vui lòng chọn loại hình đặt phòng (Đặt ngay hoặc Phê duyệt trước)'
                );
                return false;
            }

            if (!minNights || minNights <= 0) {
                ElMessage.error('Vui lòng nhập số đêm tối thiểu hợp lệ');
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
