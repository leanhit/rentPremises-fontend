import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { useSearchStore } from '@/stores/search';
import { useI18n } from 'vue-i18n';
import local from './components/supportedLocales';
import SearchBox from '@/views/layout/topnav/components/SearchBox.vue';
import { useAuthStore } from '@/stores/auth';
export default {
    components: {
        SearchBox,
    },
    setup(props, context) {
        const { t, locale } = useI18n();
        const router = useRouter();
        const route = useRoute();

        // Auth store
        const authStore = useAuthStore();
        const { token, user } = storeToRefs(authStore);
        const isAuthenticated = computed(() => !!token.value);
        const userAvatarUrl = computed(() =>
            user.value?.avatar ||
            'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg'
        );

        
        //console.log('user', user.value);
        // Dropdown visibility
        const dropdownVisible = ref(false);
        const globeDropdownVisible = ref(false);
        const dropdownMenu = ref<HTMLElement | null>(null);
        const globeMenu = ref<HTMLElement | null>(null);

        // Locale & Currency
        const currentLocale = ref(local.currentLanguage);
        const currentCurrency = ref(local.localCurrency);

        const currentFlag = ref('');
        const searchStore = useSearchStore();
        const searchQuery = computed({
            get: () => searchStore.query,
            set: (val) => searchStore.setQuery(val),
        });

        const updateSearch = () => {
            const currentPath = route.path;

            if (currentPath.startsWith('/lease')) {
                // Gọi hàm tìm kiếm trong trang lease
                searchStore.setQuery(searchQuery.value); // hoặc emit sự kiện
            } else if (currentPath.startsWith('/admin')) {
                // Tìm kiếm trong dashboard admin
            }
            // ...
        };
        const setFlag = () => {
            const found = local.supportedLocales.find(lo => lo.value === currentLocale.value);
            currentFlag.value = found ? found.flag : local.supportedLocales[0].flag;
        };
        setFlag();

        const changeLocale = (newLocale: string) => {
            localStorage.setItem('appLocale', newLocale);
            currentLocale.value = newLocale;
            locale.value = newLocale;
            setFlag(); // cập nhật flag khi đổi ngôn ngữ
            toggleGlobeDropdown();
        };

        const changeCurrency = (currency: string) => {
            localStorage.setItem('appCurrency', currency);
            currentCurrency.value = currency;
        };

        // Toggle dropdown
        function toggleDropdown() {
            dropdownVisible.value = !dropdownVisible.value;
            globeDropdownVisible.value = false;
        }

        function toggleGlobeDropdown() {
            globeDropdownVisible.value = !globeDropdownVisible.value;
            dropdownVisible.value = false;
        }

        // Click outside để đóng menu
        function handleClickOutside(event: MouseEvent) {
            const isClickInsideDropdown = dropdownMenu.value?.contains(event.target as Node);
            const isClickInsideGlobe = globeMenu.value?.contains(event.target as Node);

            if (!isClickInsideDropdown && !isClickInsideGlobe) {
                dropdownVisible.value = false;
                globeDropdownVisible.value = false;
            }
        }

        // Logout
        function handleLogout() {
            authStore.logout();
            router.push('/');
        }

        // Mount/unmount events
        onMounted(() => {
            document.addEventListener('click', handleClickOutside);
        });

        onBeforeUnmount(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        return {
            t,
            dropdownVisible,
            globeDropdownVisible,
            dropdownMenu,
            globeMenu,
            isAuthenticated,
            userAvatarUrl,
            toggleDropdown,
            toggleGlobeDropdown,
            handleClickOutside,
            handleLogout,
            changeLocale,
            changeCurrency,
            currentLocale,
            currentFlag,
            currentCurrency,
            local,
            searchQuery,
            updateSearch,
            user
        };
    }
};
