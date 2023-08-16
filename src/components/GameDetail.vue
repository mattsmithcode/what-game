<template>
    <div class="col-12 flex gap-2 p-2 pl-3">
        <p class="my-auto">
            {{ game.name }}
        </p>
        <p
            v-if="game.played"
            class="played"
        >
            <FontAwesomeIcon icon="check" />
        </p>
        <p class="flex-grow-1 my-auto text-right text-xs uppercase white-space-nowrap">
            {{ players }}
        </p>
        <Button
            type="button"
            :aria-controls="`${game.id}_menu`"
            aria-haspopup="true"
            aria-label="Menu"
            class="my-auto p-button-icon-only"
            text
            rounded
            @click="toggleMenu"
        >
            <FontAwesomeIcon icon="ellipsis-vertical" />
        </Button>
        <Menu
            :id="`${game.id}_menu`"
            ref="menu"
            :model="menuItems"
            :popup="true"
        >
            <template #item="{ item }">
                <a class="p-menuitem-link">
                    <FontAwesomeIcon
                        v-if="item.icon"
                        :icon="item.icon"
                        class="p-menuitem-icon"
                        fixed-width
                    />
                    <span class="p-menuitem-text">{{ item.label }}</span>
                </a>
            </template>
        </Menu>
        <Dialog
            v-model:visible="dialogVisible"
            :draggable="false"
            dismissable-mask
            header="Edit Game"
            modal
        >
            <EditGame
                ref="editForm"
                :value="dialogModel"
            />
            <template #footer>
                <Button
                    label="Cancel"
                    text
                    @click="dialogVisible = false"
                />
                <Button
                    autofocus
                    label="Save"
                    @click="save"
                />
            </template>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
    import EditGame from '@/components/EditGame.vue';
    import type { Game } from '@/types/game';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import Button from 'primevue/button';
    import Dialog from 'primevue/dialog';
    // noinspection ES6UnusedImports
    import Menu from 'primevue/menu';
    import { computed, ref } from 'vue';

    const emit = defineEmits<{
        (event: 'delete', id: string): void,
        (event: 'edit', id: Game): void
    }>();

    const props = defineProps<{
        game: Game
    }>();

    const dialogModel = ref<Game>();
    const dialogVisible = ref(false);
    const editForm = ref<{ game: Game }>();
    const menu = ref();

    const players = computed(() => {
        const { min, max } = props.game;

        if (min === undefined && max === undefined)
            return 'any';

        if (min === max)
            return `${min} player${min === 1 ? '' : 's'}`;

        if (min === undefined)
            return `up to ${max}`;

        if (max === undefined)
            return `${min}+`;

        return `${min}-${max}`;
    });

    const menuItems = [
        {
            label: 'Edit',
            icon: 'pencil',
            command: () => {
                dialogModel.value = {
                    ...props.game
                };
                dialogVisible.value = true;
            }
        },
        {
            label: 'Delete',
            icon: 'trash',
            command: () => emit('delete', props.game.id)
        }
    ];

    const toggleMenu = (event: Event) => {
        menu.value.toggle(event);
    };

    const save = () => {
        dialogVisible.value = false;

        if (editForm.value)
            emit('edit', editForm.value.game);
    };
</script>

<style scoped>
    .played {
        color: var(--green-500);
        margin: auto 0;
    }
</style>
