import { ref, onMounted } from 'vue';
import { useAddressStore } from '@/stores/addressStore';

export default {
    props: ['form'],
    setup(props: any) {
        const addressStore = useAddressStore();
        const fullAddress = ref('');
        const { getFullAddress } = addressStore;

        onMounted(async () => {
            fullAddress.value = await getFullAddress(
                props.form.province,
                props.form.district,
                props.form.ward,
                props.form.detail);
        });

        return {
            props,
            fullAddress,
        };
    }
};
