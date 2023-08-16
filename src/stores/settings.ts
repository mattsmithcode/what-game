import type { Theme } from '@/types/theme';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useSettingsStore = defineStore(
    'settings',
    () => {
        const players = ref(2);
        const skipPlayed = ref(true);
        const theme = ref<Theme>('automatic');

        return { players, skipPlayed, theme };
    },
    {
        persist: true,
    });

export { useSettingsStore };
