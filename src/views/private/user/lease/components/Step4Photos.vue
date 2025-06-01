<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 4: Hình ảnh</h2>

        <input
            type="file"
            multiple
            accept="image/*"
            @change="handlePhotos"
            class="mb-4"
        />

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div
                v-for="(photo, index) in photos"
                :key="index"
                class="relative group border rounded overflow-hidden"
            >
                <img :src="photo.previewUrl" class="w-full h-32 object-cover" />
                <button
                    class="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    @click="removePhoto(index)"
                >
                    Xoá
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onBeforeUnmount, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
    props: ['form'],
    setup(props: any, context: any) {
        const { t } = useI18n();

        const photos = ref<{ file: File; previewUrl: string }[]>([]);
        const objectUrls = ref<string[]>([]);

        const handlePhotos = (e: Event) => {
            const files = (e.target as HTMLInputElement).files;
            if (!files) return;

            Array.from(files).forEach((file) => {
                const previewUrl = URL.createObjectURL(file);
                objectUrls.value.push(previewUrl);
                photos.value.push({ file, previewUrl });
            });

            // Lưu File gốc vào form.photos
            props.form.photos = photos.value.map((p) => p.file);
        };

        const removePhoto = (index: number) => {
            const photo = photos.value[index];
            if (photo && photo.previewUrl) {
                URL.revokeObjectURL(photo.previewUrl);
                objectUrls.value = objectUrls.value.filter((url) => url !== photo.previewUrl);
            }
            photos.value.splice(index, 1);

            // Cập nhật form.photos là mảng File
            props.form.photos = photos.value.map((p) => p.file);
        };

        onBeforeUnmount(() => {
            objectUrls.value.forEach((url) => URL.revokeObjectURL(url));
            objectUrls.value = [];
        });

        const checkBeforeNext = async () => {
            return true;
        };

        context.expose({
            checkBeforeNext,
            selectedFiles: photos, // nếu cha cần truy cập
        });

        return {
            t,
            photos,
            handlePhotos,
            removePhoto,
        };
    },
};
</script>
