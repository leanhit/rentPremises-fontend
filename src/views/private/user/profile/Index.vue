<template>
    <div class="min-h-screen bg-white">
        <!-- Top Navigation -->
        <TopNav />

        <div class="max-w-4xl mx-auto p-4" v-if="user">
            <h2 class="text-2xl font-bold mb-4">Hồ sơ cá nhân</h2>
            <AvatarCard :user="user" />
            <AuthInfoForm :user="user" />
            <AuthContactForm :user="user" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usersApi } from '@/api/usersApi';
import { useAddressStore } from '@/stores/addressStore';
import { useI18n } from 'vue-i18n';
import TopNav from '@/views/layout/topnav/Index.vue';
import AvatarCard from './components/AvatarCard.vue';
import AuthInfoForm from './components/AuthInfoForm.vue';
import AuthContactForm from './components/AuthContactForm.vue';

const user = ref(null);

const { t } = useI18n();
const addressStoreInstance = useAddressStore();
const { fetchProvinces, fetchDistricts, fetchWards } = addressStoreInstance;

const getUserProfile = async () => {
    try {
        const response = await usersApi.getProfile();
        const data = response.data;

        // 👇 Ép kiểu về number
        data.province = data.province ? Number(data.province) : null;
        data.district = data.district ? Number(data.district) : null;
        data.ward = data.ward ? Number(data.ward) : null;

        user.value = data;

        await fetchProvinces();

        if (user.value.province) {
            await fetchDistricts(user.value.province);
        }

        if (user.value.district) {
            await fetchWards(user.value.district);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};


onMounted(getUserProfile);
</script>
