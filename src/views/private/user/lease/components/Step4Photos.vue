<template>
    <div>
        <h2 class="step-title">Hình ảnh</h2>
        <input type="file" multiple accept="image/*" @change="handlePhotos" />
        <div class="mt-4 grid grid-cols-2 gap-2">
            <img
                v-for="(photo, index) in form.photos"
                :key="index"
                :src="photo"
                class="w-full rounded" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ form: any }>();

const handlePhotos = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) return;
    Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) props.form.photos.push(reader.result.toString());
        };
        reader.readAsDataURL(file);
    });
};
</script>
