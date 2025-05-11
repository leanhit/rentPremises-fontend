import { ref } from 'vue';
import axios from 'axios';

export default {
    props: ['form'],
    setup(props: any) {
        const provinces = ref([]);
        const districts = ref([]);
        const wards = ref([]);

        // Gọi khi vào step xác nhận (confirm)
        const fetchAllLocations = async () => {
            try {
                const [provinceRes, districtRes, wardRes] = await Promise.all([
                    axios.get('https://provinces.open-api.vn/api/p'),
                    axios.get(`https://provinces.open-api.vn/api/p/${props.form.province}?depth=2`),
                    axios.get(`https://provinces.open-api.vn/api/d/${props.form.district}?depth=2`),
                ]);
                provinces.value = provinceRes.data;
                districts.value = districtRes.data.districts;
                wards.value = wardRes.data.wards;
            } catch (e) {
                console.error('Lỗi khi tải địa chỉ', e);
            }
        };

        const getFullAddress = () => {
            const { province, district, ward, detail } = props.form;
            const provinceName = provinces.value.find(p => p.code == province)?.name || '';
            const districtName = districts.value.find(d => d.code == district)?.name || '';
            const wardName = wards.value.find(w => w.code == ward)?.name || '';
            return [detail, wardName, districtName, provinceName].filter(Boolean).join(', ');
        };

        // Fetch khi load step này
        fetchAllLocations();

        return {
            props,
            getFullAddress,
        };
    }
};
