import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { usersApi } from '@/api/usersApi';
import { ElMessage } from 'element-plus';

export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup(props: any, context: any) {
        const { t } = useI18n();
        const nameLogin = ref('');
        const passwordLogin = ref('');
        const emptyFields = ref(false);

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
                        if (response.data.token) {
                            localStorage.setItem('accessToken', response.data.token);
                            window.location.href = '/dashboard';
                        } else {
                            ElMessage.error(`Oops, ${response.data.message}`);
                        }
                    })
                    .catch((error) => {
                        console.error(error);
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
