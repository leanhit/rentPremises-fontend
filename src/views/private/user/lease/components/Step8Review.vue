<template>
    <div>
        <h2 class="step-title">Xác nhận lại thông tin</h2>
        <pre class="bg-gray-100 p-4 rounded text-sm">
  {{ JSON.stringify(form, null, 2) }}
      </pre
        >
        <p class="mt-4 text-green-700 font-medium">
            Nếu thông tin đã chính xác, bấm “Đăng phòng” để hoàn tất.
        </p>
    </div>
</template>

<script lang="ts" setup>
defineProps<{ form: any }>();
</script>
