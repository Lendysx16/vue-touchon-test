<script setup lang="ts" generic="T extends { [key: string]: any }">
import { watch } from 'vue';

type Props = {
    items: T[];
    itemKeys?: (keyof T)[];
};

const props = withDefaults(defineProps<Props>(), {
    itemKeys: () => ['id'],
    placeholder: '',
});

const filteredItems = defineModel<T[]>('filteredItems', { default: () => [] });
const inputValue = defineModel<string>('modelValue', { default: '' });

function updateItems(e: Event) {
    const { value } = e.target as HTMLInputElement;
    inputValue.value = value;

    filteredItems.value = props.items.filter((item) =>
        props.itemKeys.some((key) => String(item[key]).toLocaleLowerCase().includes(value.toLowerCase()))
    );
}

watch(
    () => props.items,
    () => {
        if (!inputValue.value) {
            filteredItems.value = props.items;
            return;
        }

        filteredItems.value = props.items.filter((item) =>
            props.itemKeys.some((key) => String(item[key]).toLocaleLowerCase().includes(inputValue.value.toLowerCase()))
        );
    },
    { immediate: true }
);
</script>

<template>
    <input :value="inputValue" class="search-bar" v-bind="$attrs" @input="updateItems" />
</template>

<style lang="scss" scoped>
@use '../styles/colors';

.search-bar {
    padding: 10px;

    color: colors.$text;

    background-color: transparent;
    border: 1px solid colors.$border-accent;
    border-radius: 3px;

    &::placeholder {
        color: colors.$text;
    }
}
</style>
