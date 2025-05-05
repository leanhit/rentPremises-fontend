<template>
    <div id="step-progress">
        <div
            v-for="n in 8"
            :key="n"
            class="step"
            :class="{
                active: step === n,
                success: n < step || (n === 8 && step8Done),
            }">
            <div class="step-icon">{{ n }}</div>
            <div class="step-text">Step {{ n }}</div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    step: {
        type: Number,
        required: true,
    },
    step8Done: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped lang="scss">
#step-progress {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    .step {
        position: relative;
        width: 12.5%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .step-icon {
            width: 30px;
            height: 30px;
            border: 2px solid #ccc;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
            color: #ccc;
            z-index: 2;
        }

        .step-text {
            margin-top: 5px;
            font-size: 0.75rem;
            color: #999;
            text-align: center;
        }

        &:not(:first-child)::before {
            content: '';
            position: absolute;
            top: 15px;
            left: -50%;
            width: 100%;
            height: 2px;
            background-color: #ccc;
            z-index: 1;
        }

        &.active {
            .step-icon {
                border-color: #e91e63;
                color: #e91e63;
            }
            .step-text {
                color: #e91e63;
            }
        }

        &.success {
            .step-icon {
                background-color: #4caf50;
                border-color: #4caf50;
                color: white;
                position: relative;
            }

            .step-icon::before {
                content: '✓';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
            }

            .step-text {
                color: #4caf50;
            }

            &::before {
                background-color: #4caf50;
            }
        }
    }
}
</style>
