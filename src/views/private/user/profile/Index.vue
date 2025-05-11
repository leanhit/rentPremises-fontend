<template>
    <div class="min-h-screen bg-white">
        <!-- Top Navigation -->
        <TopNav />

        <div class="max-w-4xl mx-auto p-4">
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
import TopNav from '@/views/layout/topnav/Index.vue';
import AvatarCard from './components/AvatarCard.vue';
import AuthInfoForm from './components/AuthInfoForm.vue';
import AuthContactForm from './components/AuthContactForm.vue';

const user = ref(null);

const getUserProfile = async () => {
    try {
        const response = await usersApi.getProfile();
        console.log('User profile:', response.data);
        user.value = response.data;
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

onMounted(getUserProfile);
</script>
