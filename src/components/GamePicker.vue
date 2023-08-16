<template>
    <div class="text-center">
        <p v-if="selectedGameName">
            {{ selectedGameName }}
        </p>
        <p v-else>
            <span
                v-for="(className, index) in questionMarkClasses"
                :key="index"
                :class="className"
            >
                ?
            </span>
        </p>
        <Button
            :loading="selecting"
            :label="selecting ? 'Thinking!' : 'Pick a Game!'"
            class="mb-5"
            @click="pickGame"
        />
    </div>
    <Dialog
        v-model:visible="noGamesVisible"
        dismissable-mask
        header="Uh oh..."
        modal
    >
        You don't have any {{ settings.skipPlayed ? 'unplayed' : '' }} {{ settings.players }} player games 😢
    </Dialog>
</template>

<script setup lang="ts">
    import { useGamesStore } from '@/stores/games';
    import { useSettingsStore } from '@/stores/settings';
    import type { Game } from '@/types/game';
    import confetti from 'canvas-confetti';
    import Button from 'primevue/button';
    import Dialog from 'primevue/dialog';
    import { useConfirm } from 'primevue/useconfirm';
    import { computed, ref } from 'vue';

    const confirm = useConfirm();
    const gamesStore = useGamesStore();
    const settings = useSettingsStore();

    const noGamesVisible = ref(false);
    const selectedGameName = ref<string>();
    const selecting = ref(false);
    const questionMarkClasses = ref([...Array(7)].map(() => 'fade'));

    const questionMarkHighlightMaxInterval = computed(() => selecting.value ? 50 : 150);

    const highlightColours = [
        'blue',
        'green',
        'yellow',
        'cyan',
        'pink',
        'indigo',
        'teal',
        'orange',
        'purple',
        'red'
    ];

    const highlightRandomQuestionMark = (delay: number) => {
        setTimeout(() => {
            const questionMarkIndex = randomNumber(0, 7);

            if (selecting.value)
            {
                const colour = highlightColours[
                    randomNumber(0, highlightColours.length)
                ];

                questionMarkClasses.value[questionMarkIndex] = `text-${colour}-500`;
            }
            else
            {
                questionMarkClasses.value[questionMarkIndex] = '';
            }

            setTimeout(() => {
                questionMarkClasses.value[questionMarkIndex] = 'fade';
            }, 100);

            highlightRandomQuestionMark(
                randomNumber(1, questionMarkHighlightMaxInterval.value)
            );
        }, delay);
    };

    const pickGame = () => {
        selectedGameName.value = undefined;

        const playableGames = gamesStore.games
            .filter((game: Game) => {
                if (game.min && settings.players < game.min)
                    return false;

                if (game.max && settings.players > game.max)
                    return false;

                return !(game.played && settings.skipPlayed);
            });

        if (playableGames.length === 0)
        {
            noGamesVisible.value = true;
            return;
        }

        pickPlayableGame(playableGames);
    };

    const pickPlayableGame = (playableGames: Array<Game>) => {
        if (playableGames.length === 0)
            return pickGame();

        selecting.value = true;

        setTimeout(() => {
            const random = randomNumber(0, playableGames.length);
            const selectedGame = playableGames[random];

            selecting.value = false;

            confetti({
                disableForReducedMotion: true,
                origin: { y: 0.75 },
                particleCount: 100,
                zIndex: 9999
            });

            confirm.require({
                group: 'hero',
                message: selectedGame.name,
                header: 'You should play...',
                accept: () => {
                    selectedGame.played = true;
                    selectedGameName.value = selectedGame.name;

                    gamesStore.saveGame(selectedGame);
                },
                acceptLabel: 'Sounds good, let\'s play!',
                reject: () => {
                    pickPlayableGame(
                        playableGames.filter((game: Game) => game.id !== selectedGame.id)
                    );
                },
                rejectLabel: 'Maybe later, pick another'
            });
        }, 3000);
    };

    const randomNumber = (min: number, max: number): number => {
        const randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
        const constrainedValue = randomValue % (max - min);

        return constrainedValue + min;
    };

    highlightRandomQuestionMark(
        randomNumber(1, questionMarkHighlightMaxInterval.value)
    );
</script>

<style scoped lang="scss">
    p {
        font-size: 3rem;
        font-weight: 500;
        transition: color 0.1s ease-in;

        .fade {
            color: var(--gray-400);
            transition: color 1s ease-out;
        }
    }
</style>
