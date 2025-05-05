<template>
    <div>
        <h2 class="step-title">Vị trí</h2>
        <label>Địa chỉ:</label>
        <input
            type="text"
            v-model="form.location"
            class="input"
            placeholder="Số nhà, đường, phường, quận..." />
    </div>
</template>

<script lang="ts" setup>
defineProps<{ form: any }>();
</script>
