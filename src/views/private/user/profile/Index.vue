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

<script lang="ts" src="@/scripts/private/user/profile/index.ts"></script>