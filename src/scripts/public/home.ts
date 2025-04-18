import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import Navbar from '@/views/defaultLayout/PublicNavbar.vue';

export default defineComponent({
    components: { Navbar },
    setup() {
        const { t } = useI18n();
        return { t };
    },
});
