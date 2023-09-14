<template>
    <div class="flex flex-column gap-3">
        <p class="sub-title">
            Group
        </p>
        <label class="md:align-items-center flex flex-column md:flex-row gap-2 justify-content-between white-space-nowrap">
            Number of Players
            <NumericInput
                v-model="settings.players"
                class="md:max-w-20rem"
            />
        </label>
        <p class="sub-title">
            Games Selection
        </p>
        <div class="align-items-center flex justify-content-between my-2">
            <label
                class="white-space-nowrap"
                for="skip-played"
            >
                Don't Pick Already Played
            </label>
            <InputSwitch
                v-model="settings.skipPlayed"
                input-id="skip-played"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import NumericInput from '@/components/NumericInput.vue';
    import { useSettingsStore } from '@/stores/settings';
    import InputSwitch from 'primevue/inputswitch';

    const settings = useSettingsStore();
</script>

<style scoped lang="scss">
    label > span {
        margin-top: 0.5rem;
    }
</style>
