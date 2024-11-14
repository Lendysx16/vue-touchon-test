<script setup lang="ts">
import { Contact } from '../types/Contact';
import ContactItem from './ContactItem.vue';

type Props = {
    items: Contact[];
};

type Emits = {
    (e: 'edit', value: Contact): void;
};

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
    <TransitionGroup name="list" move-class="list-move" tag="div" class="list">
        <contact-item v-for="item in items" :key="item.id" :item="item" @click="$emit('edit', item)" />
    </TransitionGroup>
</template>

<style lang="scss">
@use './../styles/animate';

.list {
    position: relative;

    overflow-y: auto;
    overflow-x: hidden;
    height: calc(80svh - 100px);
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-self: flex-start;

    width: 100%;
}
</style>
