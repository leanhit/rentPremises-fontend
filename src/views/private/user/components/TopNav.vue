<template>
    <nav class="flex items-center justify-between p-4 border-b shadow-sm bg-white sticky top-0 z-50">
        <div class="text-2xl font-bold text-pink-600">airbnb</div>

        <div class="hidden md:flex items-center border rounded-full py-2 px-4 shadow-sm hover:shadow-md cursor-pointer">
            <span class="text-sm text-gray-600">Tìm kiếm điểm đến</span>
        </div>

        <div class="flex items-center gap-4">
            <button class="text-sm font-semibold">Cho thuê chỗ ở qua Airbnb</button>

            <!-- Globe Menu -->
            <div class="relative" ref="globeMenu">
                <button @click.stop="toggleGlobeDropdown" class="p-2 rounded-full hover:bg-gray-100 transition">
                    <svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2c2.21 2.79 3.5 6.19 3.5 10s-1.29 7.21-3.5 10c-2.21-2.79-3.5-6.19-3.5-10s1.29-7.21 3.5-10z" />
                    </svg>
                </button>

                <div v-if="globeDropdownVisible"
                    class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul class="py-2">
                        <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Tiếng Việt (VN)</li>
                        <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">English (US)</li>
                        <li class="border-t my-2"></li>
                        <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">VND - Vietnamese Dong</li>
                        <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">USD - US Dollar</li>
                    </ul>
                </div>
            </div>

            <!-- User Menu -->
            <div class="relative" ref="dropdownMenu">
                <div class="flex items-center gap-2 border rounded-full p-2 hover:shadow-md cursor-pointer"
                    @click.stop="toggleDropdown">
                    <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.5 5a.5.5 0 01.5-.5h14a.5.5 0 010 1h-14a.5.5 0 01-.5-.5zM2 10a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15A.5.5 0 012 10zm.5 4.5a.5.5 0 000 1h15a.5.5 0 000-1h-15z" />
                    </svg>
                    <img :src="userAvatarUrl" alt="User" class="w-8 h-8 rounded-full" />
                </div>

                <div v-if="dropdownVisible"
                    class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul class="py-2">
                        <template v-if="isAuthenticated">
                            <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</li>
                            <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Your Listings</li>
                            <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Settings</li>
                            <li class="border-t my-2"></li>
                            <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" @click="handleLogout">
                                <a onclick="handleLogout()">Logout</a>
                            </li>
                        </template>
                        <template v-else>
                            <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" @click="goToLogin">
                                <a href="/login">Login</a> 
                            </li>
                            <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" @click="goToRegister">
                                <a href="/register">Sign Up</a> 
                            </li>
                            <li class="border-t my-2"></li>
                            <li class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Help</li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authStore = useAuthStore();
const { token, user } = storeToRefs(authStore);

const isAuthenticated = computed(() => !!token.value);
const userAvatarUrl = computed(() =>
    user.value?.avatar || 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg'
);

const dropdownVisible = ref(false);
const globeDropdownVisible = ref(false);
const dropdownMenu = ref(null);
const globeMenu = ref(null);

function toggleDropdown() {
    dropdownVisible.value = !dropdownVisible.value;
    globeDropdownVisible.value = false;
}

function toggleGlobeDropdown() {
    globeDropdownVisible.value = !globeDropdownVisible.value;
    dropdownVisible.value = false;
}

function handleClickOutside(event: MouseEvent) {
    const isClickInsideDropdown = dropdownMenu.value?.contains(event.target);
    const isClickInsideGlobe = globeMenu.value?.contains(event.target);
    if (!isClickInsideDropdown && !isClickInsideGlobe) {
        dropdownVisible.value = false;
        globeDropdownVisible.value = false;
    }
}

function handleLogout() {
    authStore.logout();
    router.push('/login');
}

function goToLogin() {
    router.push('/login');
}

function goToRegister() {
    router.push('/register');
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
