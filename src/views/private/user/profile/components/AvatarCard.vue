<template>
    <el-card class="mb-6">
        <div class="flex items-center justify-between">
            <!-- Avatar preview + Upload -->
            <div class="flex items-center gap-4">
                <!-- Preview -->
                <el-image
                    :src="previewAvatar"
                    fit="cover"
                    class="w-40 h-40 rounded-full border" />

                <!-- Upload -->
                <el-upload
                    class="avatar-uploader"
                    :auto-upload="false"
                    :show-file-list="false"
                    :on-change="onFileChange"
                    accept="image/*">
                    <el-button type="primary" plain>Chọn ảnh</el-button>
                </el-upload>

                <div class="text-sm text-gray-500" v-if="selectedFileName">
                    {{ selectedFileName }}
                </div>
            </div>

            <!-- Submit -->
            <el-button
                type="success"
                :loading="isUploading"
                :disabled="!selectedFile"
                @click="submitAvatar">
                Đổi avatar
            </el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue';
import { usersApi } from '@/api/usersApi';
import { useAuthStore } from '@/stores/auth';
import { ElMessage } from 'element-plus';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
});

const selectedFile = ref<File | null>(null);
const selectedFileName = ref('');
const isUploading = ref(false);

// ref lưu URL avatar hiện tại, khởi tạo bằng props.user.avatar
const userAvatar = ref(
    props.user?.avatar || 'https://via.placeholder.com/80x80?text=Avatar'
);

// ref lưu object URL tạm để preview khi chọn file mới
const objectUrl = ref<string | null>(null);
const authStore = useAuthStore();

// watch selectedFile để tạo và revoke object URL đúng cách
watch(selectedFile, (newFile, oldFile) => {
    if (objectUrl.value) {
        URL.revokeObjectURL(objectUrl.value);
        objectUrl.value = null;
    }
    if (newFile) {
        objectUrl.value = URL.createObjectURL(newFile);
    }
});

// cleanup khi component bị unmount
onBeforeUnmount(() => {
    if (objectUrl.value) {
        URL.revokeObjectURL(objectUrl.value);
    }
});

// computed hiển thị avatar preview
const previewAvatar = computed(() => {
    return objectUrl.value || userAvatar.value;
});

/**
 * Hàm xử lý khi người dùng chọn file từ el-upload
 * file argument có dạng { raw: File, name: string, ... }
 */
function onFileChange(file: any) {
    if (!file) {
        selectedFile.value = null;
        selectedFileName.value = '';
        return;
    }

    // Lấy file thật trong property raw nếu có
    if (file.raw instanceof File) {
        selectedFile.value = file.raw;
        selectedFileName.value = file.name || file.raw.name || '';
    } else if (file instanceof File) {
        selectedFile.value = file;
        selectedFileName.value = file.name || '';
    } else {
        selectedFile.value = null;
        selectedFileName.value = '';
        console.warn('Invalid file input in onFileChange:', file);
    }
}

async function submitAvatar() {
    if (!selectedFile.value) {
        ElMessage.warning('Vui lòng chọn ảnh trước');
        return;
    }

    try {
        isUploading.value = true;
        const formData = new FormData();
        //console.log('selectedFile.value:', selectedFile.value);

        formData.append('avatar', selectedFile.value);

        // for (const [key, value] of formData.entries()) {
        //     console.log(`FormData entry: ${key}`, value);
        // }
        const response = await usersApi.updateAvatar(formData);
        ElMessage.success('🎉 Avatar đã được cập nhật!');
        const newAvatarUrl = response.data.avatar;

        // Cập nhật avatar mới lên UI
        userAvatar.value = newAvatarUrl;
        authStore.updateUserProfile({ avatar: newAvatarUrl });
        // Reset file đã chọn và xóa object URL cũ
        resetUploadState();
    } catch (err) {
        console.error(err);
        ElMessage.error('❌ Lỗi khi cập nhật avatar');
    } finally {
        isUploading.value = false;
    }
}

function resetUploadState() {
    selectedFile.value = null;
    selectedFileName.value = '';
    if (objectUrl.value) {
        URL.revokeObjectURL(objectUrl.value);
        objectUrl.value = null;
    }
}
</script>

<style scoped>
.avatar-uploader {
    display: inline-block;
}
</style>
