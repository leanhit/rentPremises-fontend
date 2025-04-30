<script lang="ts">
import component from '@/scripts/public/home';
export default component;
</script>

<template>
    <div>
        <section class="home-content">
            <h1>{{ t('home.welcome') }}</h1>
            <p>{{ t('home.description') }}</p>
        </section>
    </div>
</template>
