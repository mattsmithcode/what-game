<template>
    <div class="flex flex-column gap-3">
        <label class="flex flex-column gap-2">
            Game
            <InputText
                v-model="model.name"
                :class="{ 'p-invalid': props.value && !model.name }"
            />
        </label>
        <div class="players">
            <label for="min-players">Minimum Players</label>
            <NumericInput
                v-model="model.min"
                :disabled="noMinimum"
                :min="1"
                class="input mb-2"
                input-id="min-players"
                @change="constrainMaximum"
            />
            <div class="switch">
                <span>No minimum</span>
                <InputSwitch v-model="noMinimum" />
            </div>
        </div>
        <div class="players">
            <label for="max-players">Maximum Players</label>
            <NumericInput
                v-model="model.max"
                :disabled="noMaximum"
                :min="model.max === undefined ? model.min ?? 1 : 1"
                class="input mb-2"
                input-id="max-players"
                @change="constrainMinimum"
            />
            <div class="switch">
                <span>No maximum</span>
                <InputSwitch v-model="noMaximum" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import NumericInput from '@/components/NumericInput.vue';
    import type { Game } from '@/types/game';
    import InputSwitch from 'primevue/inputswitch';
    import InputText from 'primevue/inputtext';
    import { computed, ref } from 'vue';

    const props = defineProps<{
        value?: Game
    }>();

    /* eslint-disable vue/no-setup-props-destructure */
    const model = ref<Game>(props.value ?? {
        id: crypto.randomUUID(),
        name: '',
        played: false
    });
    const noMaximum = ref(props.value && !props.value.max);
    const noMinimum = ref(props.value && !props.value.min);
    /* eslint-enable vue/no-setup-props-destructure */

    const game = computed<Game>(() => ({
        id: model.value.id,
        max: noMaximum.value ? undefined : model.value.max,
        min: noMinimum.value ? undefined : model.value.min,
        name: model.value.name,
        played: model.value.played
    }));

    defineExpose({
        game
    });

    const constrainMaximum = () => {
        if (model.value.max === undefined || model.value.min === undefined)
            return;

        model.value.max = Math.max(
            model.value.max,
            model.value.min
        );
    };

    const constrainMinimum = () => {
        if (model.value.max === undefined || model.value.min === undefined)
            return;

        model.value.min = Math.min(
            model.value.max,
            model.value.min
        );
    };
</script>

<style scoped lang="scss">
    @use 'primeflex/primeflex';

    label {
        font-weight: 700;
    }

    .players {
        @include primeflex.styleclass('flex flex-column gap-2');

        .switch {
            @include primeflex.styleclass('align-items-center flex justify-content-between');
        }
    }
</style>
