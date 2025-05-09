<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 3: Tiện nghi</h2>

        <div
            v-for="(group, groupKey) in amenitiesByGroup"
            :key="groupKey"
            class="mb-6">
            <div class="flex items-center justify-between mb-2">
                <h3 class="font-semibold text-gray-700">{{ group.label }}</h3>
                <el-checkbox
                    :indeterminate="isIndeterminate(groupKey)"
                    :model-value="isAllSelected(groupKey)"
                    @change="toggleGroupSelection(groupKey, $event)">
                    Chọn tất cả
                </el-checkbox>
            </div>

            <el-checkbox-group
                v-model="form.amenities"
                class="grid grid-cols-2 md:grid-cols-3 gap-2">
                <el-checkbox
                    v-for="item in group.items"
                    :key="item"
                    :label="item">
                    {{ item }}
                </el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';

export default {
    props: ['form'],
    setup(props, { expose }) {
        const { t } = useI18n();

        const amenitiesByGroup = {
            room: {
                label: 'Phòng',
                items: ['Wifi', 'Điều hòa', 'TV', 'Bàn làm việc', 'Tủ quần áo'],
            },
            kitchen: {
                label: 'Nhà bếp',
                items: ['Bếp', 'Tủ lạnh', 'Lò vi sóng', 'Dụng cụ nấu ăn'],
            },
            outdoor: {
                label: 'Ngoài trời',
                items: ['Ban công', 'Chỗ đỗ xe', 'Hồ bơi', 'Sân vườn'],
            },
        };

        const toggleGroupSelection = (groupKey: string, checked: boolean) => {
            const groupItems = amenitiesByGroup[groupKey].items;
            if (checked) {
                // Thêm tất cả tiện nghi nhóm vào form nếu chưa có
                groupItems.forEach((item) => {
                    if (!props.form.amenities.includes(item)) {
                        props.form.amenities.push(item);
                    }
                });
            } else {
                // Bỏ tất cả tiện nghi của nhóm khỏi form
                props.form.amenities = props.form.amenities.filter(
                    (item) => !groupItems.includes(item)
                );
            }
        };

        const isAllSelected = (groupKey: string) => {
            const groupItems = amenitiesByGroup[groupKey].items;
            return groupItems.every((item) =>
                props.form.amenities.includes(item)
            );
        };

        const isIndeterminate = (groupKey: string) => {
            const groupItems = amenitiesByGroup[groupKey].items;
            const selectedCount = groupItems.filter((item) =>
                props.form.amenities.includes(item)
            ).length;
            return selectedCount > 0 && selectedCount < groupItems.length;
        };

        const checkBeforeNext = async () => {
            if (props.form.amenities.length === 0) {
                ElMessage.warning('Vui lòng chọn ít nhất một tiện nghi.');
                return false;
            }
            return true;
        };

        expose({ checkBeforeNext });

        return {
            t,
            amenitiesByGroup,
            toggleGroupSelection,
            isAllSelected,
            isIndeterminate,
            form: props.form,
        };
    },
};
</script>

<style scoped>
h3 {
    font-size: 1rem;
}
</style>
