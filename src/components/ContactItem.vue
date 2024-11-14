<script setup lang="ts">
import { useContactsStore } from '../store/contactsStore';
import { Contact } from '../types/Contact';

type Props = {
    item: Contact;
};

defineProps<Props>();

const contactsStore = useContactsStore();
</script>

<template>
    <div class="contact-card">
        <span class="contact-card-text">Имя: {{ item.name }}</span>
        <span class="contact-card-text">Email: {{ item.email }}</span>
        <span class="contact-card-text">Телефон: {{ item.phone }}</span>

        <button class="contact-card-delete" @click.stop="contactsStore.remove(item.id)">Удалить контакт</button>
    </div>
</template>

<style lang="scss">
@use './../styles/colors.scss';

.contact-card {
    cursor: pointer;

    display: flex;
    flex-direction: column;
    gap: 7px;

    width: 100%;
    padding: 15px;
    padding-bottom: 10px;

    background-color: colors.$background;
    border: 1px solid colors.$border-accent;
    border-radius: 6px;

    transition: all 0.3s ease;

    &-text {
        color: colors.$text;
        transition: all 0.3s ease;
    }

    &:hover {
        background-color: colors.$background-secondary;

        span {
            color: colors.$text-accent;
        }
    }
}

.contact-card-delete {
    cursor: pointer;

    align-self: center;

    width: 50%;
    margin-top: 15px;
    padding: 9px;

    color: colors.$text-accent;

    background-color: rgba(colors.$background-secondary, 0.8);
    border-radius: 20px;

    transition: all 0.3s ease;

    &:hover {
        color: colors.$text;
        background-color: colors.$background;
    }
}
</style>
