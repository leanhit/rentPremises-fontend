<template>
    <div>
        <h2 class="text-xl font-semibold mb-4">Step 8: Xác nhận lại thông tin</h2>

        <!-- Loại chỗ ở -->
        <div class="mb-4">
            <label class="block mb-1">Loại chỗ ở:</label>
            <p class="border border-gray-300 rounded px-3 py-2 bg-gray-50">
                {{ propertyTypeLabel }}
            </p>
        </div>

        <!-- Số lượng khách -->
        <div class="mb-4">
            <label class="block mb-1">Số lượng khách tối đa:</label>
            <p class="border border-gray-300 rounded px-3 py-2 bg-gray-50">
                {{ form.maxGuests }}
            </p>
        </div>

        <!-- Địa chỉ -->
        <div class="mb-4">
            <label class="block mb-1">Địa chỉ:</label>
            <p class="border border-gray-300 rounded px-3 py-2 bg-gray-50">
                {{ form.location.detail }}, {{ form.location.ward }}, {{ form.location.district }}, {{ form.location.province }}
            </p>
        </div>

        <!-- Tiện ích -->
        <div class="mb-4">
            <label class="block mb-1">Tiện ích:</label>
            <div class="flex flex-wrap gap-2">
                <span
                    v-for="(amenity, index) in amenityLabels"
                    :key="index"
                    class="bg-gray-200 rounded px-3 py-1 text-sm"
                >
                    {{ amenity }}
                </span>
            </div>
        </div>

        <!-- Ảnh -->
        <div class="mb-4">
            <label class="block mb-1">Ảnh:</label>
            <div class="flex gap-2 flex-wrap">
                <img
                    v-for="(photo, index) in form.photos"
                    :key="index"
                    :src="photo"
                    alt="photo"
                    class="w-24 h-24 object-cover rounded border"
                />
            </div>
        </div>

        <!-- Giá -->
        <div class="mb-4">
            <label class="block mb-1">Giá:</label>
            <p class="border border-gray-300 rounded px-3 py-2 bg-gray-50">
                {{ formatCurrency(form.pricing.price) }}
            </p>
        </div>

        <!-- Tùy chọn đặt phòng -->
        <div class="mb-4">
            <label class="block mb-1">Tùy chọn đặt phòng:</label>
            <pre class="bg-gray-100 p-4 rounded text-sm">
{{ JSON.stringify(form.bookingOptions, null, 2) }}
            </pre>
        </div>

        <div class="mt-4 text-green-700 font-medium">
            Nếu thông tin đã chính xác, bấm “Đăng phòng” để hoàn tất.
        </div>
    </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';

export default {
    props: ['form'],
    setup(props: any, context: any) {
        const { t } = useI18n();

        // Ánh xạ loại chỗ ở
        const propertyTypeMap: Record<string, string> = {
            apartment: 'Căn hộ',
            house: 'Nhà riêng',
            private_room: 'Phòng riêng',
        };

        // Ánh xạ tiện ích (ví dụ, bạn cần đồng bộ với danh sách ở Step tiện ích)
        const amenityMap: Record<string, string> = {
            wifi: 'Wi-Fi',
            air_conditioner: 'Điều hòa',
            kitchen: 'Bếp',
            washing_machine: 'Máy giặt',
            parking: 'Chỗ đậu xe',
            pool: 'Hồ bơi',
            tv: 'TV',
        };

        // Label loại chỗ ở
        const propertyTypeLabel = propertyTypeMap[props.form.propertyType] || props.form.propertyType;

        // Danh sách label tiện ích
        const amenityLabels = props.form.amenities.map((key: string) => amenityMap[key] || key);

        const formatCurrency = (price: number) => {
            if (!price) return '0';
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(price);
        };

        const checkBeforeNext = async () => true;
        context.expose({ checkBeforeNext });

        return {
            form: props.form,
            propertyTypeLabel,
            amenityLabels,
            formatCurrency,
            t,
        };
    },
};
</script>
