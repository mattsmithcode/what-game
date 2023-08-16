<template>
    <div class="flex flex-column gap-3">
        <p class="sub-title">
            Games Selection
        </p>
        <label class="md:align-items-center flex flex-column md:flex-row gap-2 justify-content-between">
            Number of Players
            <NumericInput
                v-model="settings.players"
                class="md:max-w-20rem"
            />
        </label>
        <Divider class="md:block hidden my-0" />
        <div class="align-items-center flex justify-content-between my-2">
            <label for="skip-played">Don't Pick Already Played</label>
            <InputSwitch
                v-model="settings.skipPlayed"
                input-id="skip-played"
            />
        </div>
        <Divider class="md:block hidden my-0" />
        <Button
            class="mr-auto md:w-auto w-full"
            label="Reset Played Games"
            outlined
            @click="confirmResetPlayed"
        />
        <p class="sub-title">
            Appearance
        </p>
        <div class="md:align-items-center flex flex-column md:flex-row gap-2 justify-content-between">
            <label for="theme">Theme</label>
            <Dropdown
                v-model="settings.theme"
                :options="themes"
                class="md:max-w-20rem w-full"
                input-id="theme"
                option-label="label"
                option-value="value"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import NumericInput from '@/components/NumericInput.vue';
    import { useGamesStore } from '@/stores/games';
    import { useSettingsStore } from '@/stores/settings';
    import Button from 'primevue/button';
    import Divider from 'primevue/divider';
    import Dropdown from 'primevue/dropdown';
    import InputSwitch from 'primevue/inputswitch';
    import { useConfirm } from 'primevue/useconfirm';
    import { ref } from 'vue';

    const confirm = useConfirm();
    const games = useGamesStore();
    const settings = useSettingsStore();

    const themes = ref<Array<{ label: string, value: typeof settings.theme }>>([
        { label: 'Automatic', value: 'automatic' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' }
    ]);

    const confirmResetPlayed = () => {
        confirm.require({
            message: 'This will set every game to not played',
            header: 'Reset Played Games',
            accept: games.resetPlayed
        });
    };
</script>

<style scoped lang="scss">
    label {
        font-weight: 700;
        white-space: nowrap;

        > span {
            margin-top: 0.5rem;
        }
    }

    .sub-title {
        color: var(--primary-color);
        font-weight: 500;
        margin-bottom: 0;
    }
</style>
