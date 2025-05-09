<template>
    <form @submit.prevent="submit" class="space-y-4">
        <div>
            <label class="block font-medium">Full Name</label>
            <input v-model="form.fullName" class="input" />
        </div>

        <div>
            <label class="block font-medium">Phone</label>
            <input v-model="form.phone" class="input" />
        </div>

        <div>
            <label class="block font-medium">Address</label>
            <input v-model="form.address" class="input" />
        </div>

        <div>
            <label class="block font-medium">Avatar URL</label>
            <!-- <img :src="user?.avatar" alt="Avatar" /> -->
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
            Cập nhật
        </button>
    </form>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { usersApi } from '@/api/usersApi';
import { ElMessage } from 'element-plus';

const props = defineProps({ user: Object });
const emit = defineEmits(['updated']);

const form = reactive({
    fullName: '',
    phone: '',
    address: '',
    avatar: '',
});

watch(
    () => props.user,
    (val) => {
        if (val) {
            form.fullName = val.info?.fullName;
            form.phone = val.contact?.phone;
            form.address = val.contact?.address;
            form.avatar = val.avatar;
        }
    },
    { immediate: true }
);

const submit = async () => {
    try {
        usersApi.updateProfile({
            fullName: form.fullName,
            phone: form.phone,
            address: form.address,
            avatar: form.avatar,
        });
        ElMessage.success('Cập nhật thành công');
        emit('updated');
    } catch (err) {
        ElMessage.error('Đã xảy ra lỗi khi cập nhật');
    }
};
</script>
