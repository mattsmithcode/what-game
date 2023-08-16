<template>
    <div class="p-inputgroup">
        <InputText
            :id="props.inputId"
            v-model="value"
            :disabled="props.disabled"
            :max="props.max"
            :min="props.min"
            type="number"
            @change="emit('change', Number(value))"
        />
        <Button
            :disabled="props.disabled"
            class="p-button-icon-only"
            @mouseup="decrement"
        >
            -
        </Button>
        <Button
            :disabled="props.disabled"
            class="p-button-icon-only"
            @mouseup="increment"
        >
            +
        </Button>
    </div>
</template>

<script setup lang="ts">
    import Button from 'primevue/button';
    import InputText from 'primevue/inputtext';
    import { computed } from 'vue';

    const emit = defineEmits<{
        (event: 'change', value?: number): void,
        (event: 'update:modelValue', value?: number): void
    }>();

    const props = defineProps<{
        disabled?: boolean,
        inputId?: string,
        max?: number,
        min?: number,
        modelValue?: number
    }>();

    const value = computed({
        get: () => props.modelValue?.toString(),
        set(value) {
            emit('update:modelValue', Number(value));
        }
    });

    const clamp = (newValue: number) => {
        const maxValue = props.max ?? newValue;
        const minValue = props.min ?? newValue;

        return Math.max(
            Math.min(
                newValue,
                maxValue
            ),
            minValue
        );
    };

    const decrement = () => {
        const currentValue = props.modelValue ?? 1;
        const clampedValue = clamp(currentValue - 1);

        emit('update:modelValue', clampedValue);
        emit('change', clampedValue);
    };

    const increment = () => {
        const currentValue = props.modelValue ?? 0;
        const clampedValue = clamp(currentValue + 1);

        emit('update:modelValue', clampedValue);
        emit('change', clampedValue);
    };
</script>

<style scoped lang="scss">
    input[type="number"] {
        appearance: textfield;
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
</style>
