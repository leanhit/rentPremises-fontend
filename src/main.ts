import { createApp, defineAsyncComponent } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import { Waypoint } from 'vue-waypoint';
import VueLazyLoad from 'vue3-lazyload';
import TextClamp from 'vue3-text-clamp';
import SkeletonBoxWithoutLoading from '@/components/SkeletonBoxWithoutLoading.vue';
import moment from 'moment';
import './assets/styles.css';
import i18n from "./i18n";
// import VueGoogleMaps from '@fawmi/vue-google-maps';

// 👉 Tạo app
const app = createApp(App);

// 👉 Khởi tạo Pinia
const pinia = createPinia();
app.use(pinia);

// 👉 Fetch user nếu đã có token
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();
if (authStore.isLoggedIn && !authStore.user) {
    authStore.fetchUser?.();
}

// 👉 Cài đặt các plugin
app.use(router);
app.use(ElementPlus);
app.use(VueLazyLoad);
app.use(TextClamp);
app.use(i18n);

// app.use(VueGoogleMaps, {
//     load: {
//         key: 'YOUR_GOOGLE_MAPS_API_KEY',
//         libraries: 'places',
//     },
// });

// 👉 Đăng ký component toàn cục
app.component(
    'no-data',
    defineAsyncComponent({
        loader: () => import('@/components/NoData.vue'),
        loadingComponent: SkeletonBoxWithoutLoading,
    })
);
app.component('Waypoint', Waypoint);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 👉 Custom directive
app.directive('highlight', {
    beforeMount(el, binding) {
        try {
            if (binding && binding.value && binding.value.keyword && binding.value.keyword !== '') {
                el.innerHTML = el.innerHTML.replace(
                    new RegExp(binding.value.keyword, "gi"),
                    (match: any) => `<span class="highlightText">${match}</span>`
                );
            }
        } catch { }
    }
});

// 👉 Custom global filters
app.config.globalProperties.$filters = {
    prettyDate(value: any) {
        if (!value) value = new Date();
        return moment(value).calendar(null, {
            sameDay: '[Hôm nay] HH:mm:ss',
            lastDay: '[Hôm qua] HH:mm:ss',
            lastWeek: 'DD/MM/YYYY HH:mm:ss',
            sameElse: 'DD/MM/YYYY HH:mm:ss',
        });
    },
    prettyDateUnix(value: any) {
        if (!value) return '--';
        return moment.unix(value).calendar(null, {
            sameDay: '[Hôm nay] HH:mm:ss',
            lastDay: '[Hôm qua] HH:mm:ss',
            lastWeek: 'DD/MM/YYYY HH:mm:ss',
            sameElse: 'DD/MM/YYYY HH:mm:ss',
        });
    },
    durationToStr(startDate: string, endDate: string) {
        const diff = moment.duration(moment(startDate).diff(moment(endDate)));
        const milliseconds: number = diff.asMilliseconds();

        const numberEnding = (number: number) => (number > 1 ? 's' : '');

        let temp = Math.floor(milliseconds / 1000);
        const years = Math.floor(temp / 31536000);
        if (years) return years + ' năm';

        const days = Math.floor((temp %= 31536000) / 86400);
        if (days) return days + ' ngày';

        const hours = Math.floor((temp %= 86400) / 3600);
        if (hours) return hours + ' giờ';

        const minutes = Math.floor((temp %= 3600) / 60);
        if (minutes) return minutes + ' phút';

        const seconds = temp % 60;
        if (seconds) return seconds + ' giây';

        return '';
    }
};

app.config.globalProperties.$router = router;

// 👉 Axios instance setup
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
    function (config) {
        const source = axios.CancelToken.source();
        config.cancelToken = source.token;
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('axios.interceptors', error);
        return error;
    }
);

app.config.globalProperties.axios = axiosInstance;
app.config.globalProperties.$http = axiosInstance;
app.provide('axios', axiosInstance);

// 👉 Mount app
app.mount('#vue-app');
