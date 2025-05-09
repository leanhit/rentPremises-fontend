<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 1: Thông tin cơ bản</h2>

        <div class="mb-4">
            <label class="block mb-1">Loại chỗ ở:</label>
            <select
                v-model="form.propertyType"
                class="w-full border border-gray-300 rounded px-3 py-2">
                <option value="apartment">Căn hộ</option>
                <option value="house">Nhà riêng</option>
                <option value="private_room">Phòng riêng</option>
            </select>
        </div>

        <div class="mb-4">
            <label class="block mb-1">Số lượng khách tối đa:</label>
            <input
                type="number"
                v-model="form.maxGuests"
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
            if (!props.form.propertyType) {
                ElMessage.error('Vui lòng chọn loại chỗ ở.');
                return false;
            }

            const maxGuests = props.form.maxGuests;

            // Kiểm tra rỗng
            if (
                maxGuests === undefined ||
                maxGuests === null ||
                maxGuests === ''
            ) {
                ElMessage.error('Vui lòng nhập số lượng khách tối đa.');
                return false;
            }

            // Ép về số nguyên
            const parsed = parseInt(maxGuests, 10);

            // Kiểm tra có phải số nguyên dương không
            if (
                isNaN(parsed) ||
                !/^\d+$/.test(maxGuests.toString()) || // Không chứa chữ, dấu, thập phân
                parsed <= 0
            ) {
                ElMessage.error(
                    'Số lượng khách phải là số nguyên dương hợp lệ.'
                );
                return false;
            }

            // Cập nhật lại giá trị chính xác nếu cần
            props.form.maxGuests = parsed;

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
