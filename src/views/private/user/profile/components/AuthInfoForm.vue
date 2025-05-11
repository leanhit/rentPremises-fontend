<template>
    <div class="space-y-4">
        <div>
            <label class="block font-medium">Full Name</label>
            <input v-model="form.fullName" class="input" />
        </div>

        <div>
            <label class="block font-medium">Birthday</label>
            <input v-model="form.dateOfBirth" type="date" class="input" />
        </div>

        <div>
            <label class="block font-medium">Gender</label>
            <select v-model="form.gender" class="input">
                <option value="">-- Chọn giới tính --</option>
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
            </select>
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
            Cập nhật
        </button>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { usersApi } from '@/api/usersApi';
import { ElMessage } from 'element-plus';

const props = defineProps({ user: Object });
const emit = defineEmits(['updated']);

const form = reactive({
    fullName: '',
    dateOfBirth: '',
    gender: '',
});

watch(
    () => props.user,
    (val) => {
        if (val) {
            form.fullName = val.fullName;
            form.dateOfBirth = val.dateOfBirth;
            form.gender = val.gender;
        }
    },
    { immediate: true }
);

const submit = async () => {
    try {
        usersApi.updateProfile({
            fullName: form.fullName,
            dateOfBirth: form.dateOfBirth,
            gender: form.gender,
        });
        ElMessage.success('Cập nhật thành công');
        emit('updated');
    } catch (err) {
        ElMessage.error('Đã xảy ra lỗi khi cập nhật');
    }
};
</script>

