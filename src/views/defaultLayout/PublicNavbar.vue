<template>
    <nav class="navbar-custom">
        <!-- Logo bên trái -->
        <div class="navbar-left">
            <a href="/"
                ><img src="@/assets/defaultImg.png" alt="Logo" class="logo"
            /></a>
        </div>

        <!-- Bên phải: Cờ + Sign Up + Login -->
        <div class="navbar-right">
            <!-- Lá cờ -->
            <div class="language-wrapper">
                <img :src="currentFlag" class="flag-img" alt="Lang" />
                <div class="language-dropdown">
                    <a
                        v-for="locale in supportedLocales"
                        :key="locale.value"
                        class="dropdown-item"
                        @click="changeLocale(locale.value)"
                        href="#">
                        <img :src="locale.flag" class="flag-img" />
                        <span>{{ locale.label }}</span>
                    </a>
                </div>
            </div>

            <!-- Nút Login / Sign Up -->
            <a class="btn-auth" href="/register">Register</a>
            <a class="btn-auth" href="/login">Login</a>
        </div>
    </nav>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { supportedLocales, currentLanguage } from '@/until/constant';

export default {
    setup() {
        const { t } = useI18n();
        const currentLocale = ref(currentLanguage ?? 'en');
        const currentFlag = ref('');

        const setFlag = () => {
            const locale = supportedLocales.find(
                (l) => l.value === currentLocale.value
            );
            if (locale) {
                currentFlag.value = locale.flag;
            }
        };

        const changeLocale = (newLocale: string) => {
            localStorage.setItem('restaurentLocale', newLocale);
            currentLocale.value = newLocale;
            setFlag();
            location.reload();
        };

        onMounted(() => {
            setFlag();
            const recaptchaScript = document.createElement('script');
            recaptchaScript.setAttribute('src', '/js/app.js');
            document.head.appendChild(recaptchaScript);
        });

        return {
            t,
            changeLocale,
            currentLocale,
            currentFlag,
            supportedLocales,
        };
    },
};
</script>

<style scoped>
.navbar-custom {
    background-color: #2c3e50;
    padding: 0 24px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
}

.navbar-left {
    display: flex;
    align-items: center;
}

.logo {
    height: 40px;
    object-fit: contain;
}

.navbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.flag-img {
    height: 20px;
    border-radius: 2px;
    vertical-align: middle;
}

.language-wrapper {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.language-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    color: black;
    z-index: 10;
    padding: 0.5rem;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    display: none;
    min-width: 130px;
}

.language-wrapper:hover .language-dropdown {
    display: block;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0.5rem;
    text-decoration: none;
    color: black;
}

.dropdown-item:hover {
    background-color: #f0f0f0;
}

.btn-auth {
    background: transparent;
    border: none;
    color: white;
    font-size: 14px;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;
}

.btn-auth:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
