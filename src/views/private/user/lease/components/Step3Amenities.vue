<template>
    <div>
        <h2 class="step-title">Tiện nghi</h2>
        <label
            ><input type="checkbox" value="Wifi" v-model="form.amenities" />
            Wifi</label
        >
        <label
            ><input type="checkbox" value="Điều hòa" v-model="form.amenities" />
            Điều hòa</label
        >
        <label
            ><input type="checkbox" value="Bếp" v-model="form.amenities" />
            Bếp</label
        >
    </div>
</template>

<script lang="ts" setup>
defineProps<{ form: any }>();
</script>
