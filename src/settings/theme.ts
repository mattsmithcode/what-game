import { useSettingsStore } from '@/stores/settings';
import type { Theme } from '@/types/theme';
import { usePrimeVue } from 'primevue/config';
import type { PrimeVueChangeTheme } from 'primevue/config';
import { ref, watchEffect } from 'vue';

const themes = {
    dark: 'md-dark-deeppurple',
    light: 'md-light-deeppurple'
};

const prefersDarkTheme = ref<boolean>();

const setTheme = (theme: Theme, prefersDarkTheme: boolean | undefined, changeTheme: PrimeVueChangeTheme) => {
    const darkTheme = (theme === 'automatic' && prefersDarkTheme) || theme === 'dark';
    const currentTheme = darkTheme ? themes.light : themes.dark;
    const newTheme = darkTheme ? themes.dark : themes.light;

    changeTheme(currentTheme, newTheme, 'theme-link');
};

const useThemes = () => {
    if (prefersDarkTheme.value === undefined)
    {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

        prefersDarkTheme.value = matchMedia.matches;

        matchMedia.addEventListener('change', ({ matches }) => {
            prefersDarkTheme.value = matches;
        });
    }

    const primeVue = usePrimeVue();
    const settings = useSettingsStore();

    watchEffect(() => {
        setTheme(settings.theme, prefersDarkTheme.value, primeVue.changeTheme);
    });
};

export { useThemes };
