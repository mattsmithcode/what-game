import type { Game } from '@/types/game';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const useGamesStore = defineStore(
    'games',
    () => {
        const games = ref<Array<Game>>([ ]);

        const deleteGame = (id: string) => {
            games.value = games.value
                .filter((game) => game.id !== id);
        };

        const resetPlayed = () => {
            games.value = games.value
                .map((game) => ({
                    ...game,
                    played: false
                }));
        };

        const saveGame = (game: Game) => {
            const newGames = games.value
                .filter((existingGame) => existingGame.id !== game.id);

            newGames.push(game as Game);

            setGames(newGames);
        };

        const setGames = (gamesList: Array<Game>) => {
            games.value = gamesList;

            games.value
                .sort((a, b) => a.name.localeCompare(b.name));
        };

        return { deleteGame, games, resetPlayed, saveGame, setGames };
    },
    {
        persist: {
            serializer: {
                serialize: (value) => JSON.stringify(value.games),
                deserialize: (value) => ({ games: JSON.parse(value) as Array<Game> })
            }
        }
    }
);

export { useGamesStore };
