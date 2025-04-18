<script lang="ts" src="@/scripts/public/register/registrationForm.ts"></script>
<template>
    <div class="container">
        <div id="main-wrapper">
            <div id="form-wrapper">
                <h1 class="form-title">Sign Up</h1>
                <div id="step-progress">
                    <div
                        class="step"
                        :class="{ active: step === 4, success: step4Done }">
                        <div class="step-icon">4</div>
                        <div class="step-text">{{ t('Confirm') }}</div>
                    </div>
                    <div class="step" :class="{ active: step === 3 }">
                        <div class="step-icon">3</div>
                        <div class="step-text">{{ t('Contact Info') }}</div>
                    </div>
                    <div class="step" :class="{ active: step === 2 }">
                        <div class="step-icon">2</div>
                        <div class="step-text">{{ t('Personal Info') }}</div>
                    </div>
                    <div class="step" :class="{ active: step === 1 }">
                        <div class="step-icon">1</div>
                        <div class="step-text">{{ t('Account') }}</div>
                    </div>
                </div>
                <div v-if="!step4Done">
                    <div class="step-by-step">
                        <div v-if="step === 1">
                            <Step1Account ref="step1Ref" :form="form" />
                        </div>
                        <div v-if="step === 2">
                            <Step2PersonalInfo ref="step2Ref" :form="form" />
                        </div>
                        <div v-if="step === 3">
                            <Step3ContactInfo ref="step3Ref" :form="form" />
                        </div>
                        <div v-if="step === 4">
                            <Step4Confirm ref="step4Ref" :form="form" />
                        </div>
                    </div>

                    <div id="form-action-btns">
                        <button
                            class="form-action"
                            :class="{ active: step > 1 }"
                            id="previous"
                            type="button"
                            @click="previewFunction()">
                            Previous
                        </button>
                        <button
                            class="form-action"
                            :class="{ active: step < 4 }"
                            id="next"
                            type="button"
                            @click="nextFunction()">
                            Next
                        </button>
                        <button
                            class="form-action"
                            :class="{ active: step === 4 }"
                            id="submit"
                            form="signup-form"
                            type="submit"
                            @click="submitFunction()">
                            Submit
                        </button>
                    </div>
                </div>
                <div v-if="step4Done">
                    <Success />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/views/public/styles/register.scss';
</style>
