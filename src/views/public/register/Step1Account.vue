<script lang="ts" src="@/scripts/public/register/step1Account.ts"></script>
<template>
    <div class="form-step-child">
        <div class="form-step-group">
            <label for="username">Username</label>
            <input
                v-model="username"
                type="text"
                id="username"
                class="form-step-inp"
                required
                placeholder="username" />
        </div>

        <div class="form-step-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
                <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    class="form-step-inp"
                    required
                    placeholder="Enter password" />
                <button
                    type="button"
                    class="toggle-password"
                    @click="showPassword = !showPassword">
                    <span v-if="showPassword">🙈</span>
                    <span v-else>👁️</span>
                </button>
            </div>
        </div>

        <div class="form-step-group">
            <label for="repassword">Confirm Password</label>
            <div class="input-wrapper">
                <input
                    v-model="repassword"
                    :type="showRepassword ? 'text' : 'password'"
                    id="repassword"
                    class="form-step-inp"
                    required
                    placeholder="Re-enter password" />
                <button
                    type="button"
                    class="toggle-password"
                    @click="showRepassword = !showRepassword">
                    <span v-if="showRepassword">🙈</span>
                    <span v-else>👁️</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/views/public/styles/step.scss';
</style>
