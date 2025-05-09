<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 4: Hình ảnh</h2>

        <input
            type="file"
            multiple
            accept="image/*"
            @change="handlePhotos"
            class="mb-4" />

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div
                v-for="(photo, index) in form.photos"
                :key="index"
                class="relative group border rounded overflow-hidden">
                <img :src="photo" class="w-full h-32 object-cover" />
                <button
                    class="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                    @click="removePhoto(index)">
                    Xoá
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';

export default {
    props: ['form'],
    setup(props: any, context: any) {
        const { t } = useI18n();

        const handlePhotos = (e: Event) => {
            const files = (e.target as HTMLInputElement).files;
            if (!files) return;

            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result) {
                        props.form.photos.push(reader.result.toString());
                    }
                };
                reader.readAsDataURL(file);
            });
        };

        const removePhoto = (index: number) => {
            props.form.photos.splice(index, 1);
        };

        const checkBeforeNext = async () => {
            // Bạn có thể bắt buộc cần ít nhất 1 ảnh nếu muốn
            // return props.form.photos.length > 0;
            return true;
        };

        context.expose({
            checkBeforeNext,
        });

        return {
            t,
            form: props.form,
            handlePhotos,
            removePhoto,
        };
    },
};
</script>
