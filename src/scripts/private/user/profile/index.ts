import { ref, onMounted } from 'vue';
import { usersApi } from '@/api/usersApi';
import { useAddressStore } from '@/stores/addressStore';
import { useI18n } from 'vue-i18n';
import TopNav from '@/views/layout/topnav/Index.vue';
import AvatarCard from '@/views/private/user/profile/components/AvatarCard.vue';
import AuthInfoForm from '@/views/private/user/profile/components/AuthInfoForm.vue';
import AuthContactForm from '@/views/private/user/profile/components/AuthContactForm.vue';

export default {
    components: {
        TopNav,
        AvatarCard,
        AuthInfoForm,
        AuthContactForm,
    },
    setup() {
        const user = ref(null);
        const { t } = useI18n();

        const addressStoreInstance = useAddressStore();
        const { fetchProvinces, fetchDistricts, fetchWards } = addressStoreInstance;

        const getUserProfile = async () => {
            try {
                const response = await usersApi.getProfile();
                const data = response.data;

                // 👇 Ép kiểu về number nếu có
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

        return {
            user,
            t,
        };
    },
};
