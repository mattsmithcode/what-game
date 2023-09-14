<template>
    <div class="flex flex-column gap-3">
        <p class="sub-title">
            Games Selection
        </p>
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
            <label
                class="white-space-nowrap"
                for="theme"
            >
                Theme
            </label>
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
    import { useGamesStore } from '@/stores/games';
    import { useSettingsStore } from '@/stores/settings';
    import Button from 'primevue/button';
    import Dropdown from 'primevue/dropdown';
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
