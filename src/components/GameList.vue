<template>
    <div class="text-right mb-3">
        <Button
            size="small"
            @click="addGame"
        >
            <span class="p-button-icon-left">
                <FontAwesomeIcon icon="plus" />
            </span>
            <span>Add Game</span>
        </Button>
    </div>
    <div class="border-round overflow-hidden">
        <DataView
            v-if="gamesStore.games.length"
            :value="gamesStore.games"
            data-key="id"
        >
            <template #list="{ data }">
                <GameDetail
                    :game="data"
                    class="game"
                    @delete="gamesStore.deleteGame"
                    @edit="gamesStore.saveGame"
                />
            </template>
        </DataView>
    </div>
    <Dialog
        v-model:visible="dialogVisible"
        :draggable="false"
        dismissable-mask
        header="Edit Game"
        modal
    >
        <EditGame ref="editForm" />
        <template #footer>
            <Button
                label="Cancel"
                text
                @click="dialogVisible = false"
            />
            <Button
                :disabled="editForm && !editForm.valid"
                autofocus
                label="Save"
                @click="save"
            />
        </template>
    </Dialog>
</template>

<script setup lang="ts">
    import EditGame from '@/components/EditGame.vue';
    import GameDetail from '@/components/GameDetail.vue';
    import { useGamesStore } from '@/stores/games';
    import type { Game } from '@/types/game';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import Button from 'primevue/button';
    import DataView from 'primevue/dataview';
    import Dialog from 'primevue/dialog';
    import { ref } from 'vue';

    const dialogModel = ref<Game>();
    const dialogVisible = ref(false);
    const editForm = ref<{ game: Game, valid: boolean }>();
    const gamesStore = useGamesStore();

    const addGame = () => {
        dialogModel.value = {
            id: crypto.randomUUID(),
            name: '',
            played: false
        };
        dialogVisible.value = true;
    };

    const save = () => {
        dialogVisible.value = false;

        if (editForm.value)
            gamesStore.saveGame(editForm.value.game);
    };
</script>

<style scoped>
    :deep(.p-dataview .p-dataview-content) {
        padding: 0;
    }

    .game:last-of-type {
        border-bottom-width: 0 !important;
    }
</style>
