<script lang="ts" src="@/scripts/public/login.ts"></script>

<template>
    <div id="app">
        <div class="login-page">
            <transition name="fade">
                <div class="wallpaper-login"></div>
            </transition>

            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
                        <div class="card login" :class="{ error: emptyFields }">
                            <h1>Sign In</h1>
                            <form class="form-group" @submit.prevent="doLogin">
                                <input
                                    v-model="nameLogin"
                                    type="text"
                                    class="form-control"
                                    placeholder="Name"
                                    required />
                                <input
                                    v-model="passwordLogin"
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    required />
                                <input
                                    type="submit"
                                    class="btn btn-primary"
                                    value="Sign In" />
                                <p>
                                    Don't have an account?
                                    <router-link
                                        to="/register"
                                        class="text-blue-600 hover:underline">
                                        Sign up
                                    </router-link>
                                    here
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/views/public/styles/login.scss';
</style>
