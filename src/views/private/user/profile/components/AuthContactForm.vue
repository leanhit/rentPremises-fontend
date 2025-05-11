<template>
    <div class="space-y-4">
        <div>
            <label class="block font-medium">Phone</label>
            <input v-model="form.phone" class="input" />
        </div>

        <div>
            <label class="block font-medium">Address</label>
            <input v-model="form.address" class="input" />
        </div>
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


