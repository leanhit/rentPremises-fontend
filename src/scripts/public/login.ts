import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { usersApi } from '@/api/usersApi';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '@/stores/auth'; // ✅ Thêm dòng này

export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup(props: any, context: any) {
        const { t } = useI18n();
        const nameLogin = ref('');
        const passwordLogin = ref('');
        const emptyFields = ref(false);

        const router = useRouter();
        const authStore = useAuthStore(); // ✅ Tạo instance của store

        function doLogin() {
            if (nameLogin.value === '' || passwordLogin.value === '') {
                alert('Please fill in all fields');
                emptyFields.value = true;
            } else {
                const data = {
                    username: nameLogin.value,
                    password: passwordLogin.value,
                };

                usersApi
                    .login(data)
                    .then((response) => {
                        if (response.status === 200) {
                            const token = response.data.token;
                            const user = response.data; // Giả sử trong response đã có user info và systemRole

                            authStore.login(token, user); // ✅ Gọi store login

                            if (response.data.systemRole === 'ADMIN') {
                                router.push('/admin-dashboard');
                            } else if (response.data.systemRole === 'USER') {
                                router.push('/');
                            } else {
                                router.push('/login');
                            }
                        } else {
                            ElMessage.error(`Oops, ${response.data.message}`);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        ElMessage.error('Login failed. Please check your credentials.');
                    });
            }
        }

        return {
            t,
            nameLogin,
            passwordLogin,
            emptyFields,
            doLogin,
        };
    },
};
