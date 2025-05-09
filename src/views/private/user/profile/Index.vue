<template>
    <div class="max-w-4xl mx-auto p-4">
        <h2 class="text-2xl font-bold mb-4">Hồ sơ cá nhân</h2>
        <ProfileCard :user="user" />
        <ProfileEditForm :user="user" @updated="getUserProfile" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usersApi } from '@/api/usersApi';
import ProfileCard from './components/ProfileCard.vue';
import ProfileEditForm from './components/ProfileEditForm.vue';

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
