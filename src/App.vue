<template>
    <GamePicker />
    <TabView>
        <TabPanel header="Games">
            <GameList />
        </TabPanel>
        <TabPanel header="Settings">
            <AppSettings />
        </TabPanel>
    </TabView>
    <ConfirmDialog :draggable="false" />
    <ConfirmDialog
        :draggable="false"
        :pt="{
            message: {
                class: 'text-3xl'
            }
        }"
        group="hero"
    />
</template>

<script setup lang="ts">
    import AppSettings from '@/components/AppSettings.vue';
    import GameList from '@/components/GameList.vue';
    import GamePicker from '@/components/GamePicker.vue';
    import { useThemes } from '@/settings/theme';
    import ConfirmDialog from 'primevue/confirmdialog';
    import TabPanel from 'primevue/tabpanel';
    import TabView from 'primevue/tabview';

    useThemes();
</script>
