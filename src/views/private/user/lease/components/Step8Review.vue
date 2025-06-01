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
                {{ fullAddress }}
            </p>
        </div>

        <!-- Tiện ích -->
        <div class="mb-4">
            <label class="block mb-1">Tiện ích:</label>
            <div class="flex flex-wrap gap-2">
                <span
                    v-for="(amenity, index) in amenityLabels"
                    :key="index"
                    class="bg-gray-200 rounded px-3 py-1 text-sm">
                    {{ amenity }}
                </span>
            </div>
        </div>

        <!-- Ảnh -->
        <div class="mb-4">
            <label class="block mb-1">Ảnh:</label>
            <div class="flex gap-2 flex-wrap">
                <img
                    v-for="(src, index) in photoPreviews"
                    :key="index"
                    :src="src"
                    alt="photo"
                    class="w-24 h-24 object-cover rounded border" />
            </div>
        </div>

        <!-- Giá -->
        <div class="mb-4">
            <ul class="bg-gray-100 p-4 rounded text-sm space-y-1">
                <li>
                    <strong>Giá mỗi đêm:</strong>
                    <span>{{ formatCurrency(form.pricing.pricePerNight) }}</span>
                </li>
                <li>
                    <strong>Phí dọn dẹp:</strong>
                    <span>{{ formatCurrency(form.pricing.cleaningFee) }}</span>
                </li>
            </ul>
        </div>

        <!-- Tùy chọn đặt phòng -->
        <div class="mb-4">
            <label class="block mb-1">Tùy chọn đặt phòng:</label>
            <ul class="bg-gray-100 p-4 rounded text-sm space-y-1">
                <li>
                    <strong>Hình thức đặt phòng:</strong>
                    <span>{{ form.bookingOptions.type }}</span>
                </li>
                <li>
                    <strong>Số đêm tối thiểu:</strong>
                    <span>{{ form.bookingOptions.minNights }}</span>
                </li>
            </ul>
        </div>

        <div class="mt-4 text-green-700 font-medium">
            Nếu thông tin đã chính xác, bấm “Đăng phòng” để hoàn tất.
        </div>
    </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useAddressStore } from '@/stores/addressStore';
import { useI18n } from 'vue-i18n';

export default {
    props: ['form'],
    setup(props: any, context: any) {
        const { t } = useI18n();
        const addressStore = useAddressStore();
        const fullAddress = ref('');
        const { getFullAddress } = addressStore;

        onMounted(async () => {
            fullAddress.value = await getFullAddress(
                props.form.province,
                props.form.district,
                props.form.ward,
                props.form.detail
            );
        });

        const propertyTypeMap: Record<string, string> = {
            apartment: 'Căn hộ',
            house: 'Nhà riêng',
            private_room: 'Phòng riêng',
        };

        const amenityMap: Record<string, string> = {
            wifi: 'Wi-Fi',
            air_conditioner: 'Điều hòa',
            kitchen: 'Bếp',
            washing_machine: 'Máy giặt',
            parking: 'Chỗ đậu xe',
            pool: 'Hồ bơi',
            tv: 'TV',
        };

        const propertyTypeLabel =
            propertyTypeMap[props.form.propertyType] || props.form.propertyType;

        const amenityLabels = props.form.amenities.map(
            (key: string) => amenityMap[key] || key
        );

        const formatCurrency = (price: number) => {
            if (!price) return '0';
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(price);
        };

        const photoPreviews = ref<string[]>([]);

        watch(
            () => props.form.photos,
            (newPhotos: (string | File)[]) => {
                // Xoá URL cũ trước (nếu là blob)
                photoPreviews.value.forEach((url) => {
                    if (url.startsWith('blob:')) URL.revokeObjectURL(url);
                });

                photoPreviews.value = newPhotos.map((p) =>
                    typeof p === 'string' ? p : URL.createObjectURL(p)
                );
            },
            { immediate: true }
        );

        onUnmounted(() => {
            photoPreviews.value.forEach((url) => {
                if (url.startsWith('blob:')) URL.revokeObjectURL(url);
            });
        });

        const checkBeforeNext = async () => true;
        context.expose({ checkBeforeNext });

        return {
            form: props.form,
            propertyTypeLabel,
            amenityLabels,
            formatCurrency,
            fullAddress,
            photoPreviews,
            t,
        };
    },
};
</script>
