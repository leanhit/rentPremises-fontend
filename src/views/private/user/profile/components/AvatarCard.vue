<template>
    <div
        class="bg-white shadow rounded-lg p-6 mb-6 flex justify-between items-center">
        <!-- Left side: Update button -->
        <div class="flex items-center gap-4">
            <!-- Avatar preview -->
            <img
                :src="previewAvatar"
                class="w-20 h-20 rounded-full object-cover border border-gray-300"
                alt="User Avatar" />

            <!-- File input -->
            <div class="text-right">
                <label
                    for="avatarUpload"
                    class="cursor-pointer bg-gray-100 text-gray-800 px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-200 transition block w-fit">
                    Chọn ảnh
                </label>
                <input
                    id="avatarUpload"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="onFileChange" />
                <p class="text-sm text-gray-500 mt-1" v-if="selectedFileName">
                    {{ selectedFileName }}
                </p>
            </div>
        </div>

        <!-- Right side: Avatar preview + File input -->
        <div>
            <button
                @click="submitAvatar"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Đổi avatar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    user: {
        type: Object,
        default: () => ({}),
    },
});

const selectedFile = ref(null);
const selectedFileName = ref('');

const previewAvatar = computed(() => {
    return selectedFile.value
        ? URL.createObjectURL(selectedFile.value)
        : props.user?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5szWL45_SSCxUWSwLJa_Ptp9GPUbM4dhOaA&s';
});

function onFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        selectedFile.value = file;
        selectedFileName.value = file.name;
    }
}

function submitAvatar() {
    if (!selectedFile.value) {
        alert('Bạn chưa chọn ảnh mới!');
        return;
    }

    const formData = new FormData();
    formData.append('avatar', selectedFile.value);

    console.log('FormData gửi đi:', formData.get('avatar'));
    alert('Avatar đã được cập nhật (giả lập)');
}
</script>
