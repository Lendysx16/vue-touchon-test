<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useContactsStore } from '../store/contactsStore';
import { Contact } from '../types/Contact';
import ContactForm from './ContactForm.vue';
import ContactsList from './ContactsList.vue';
import SearchBar from './SearchBar.vue';

const contactsStore = useContactsStore();

const formIsOpened = ref<boolean>(false);
const isLoading = ref<boolean>(true);

const filteredItems = ref<Contact[]>([]);

const itemToEdit = ref<Contact>();
const editModelOpened = ref<boolean>(false);

onMounted(() => {
    isLoading.value = true;
    contactsStore.loadList().finally(() => (isLoading.value = false));
});
</script>

<template>
    <div class="main">
        <div class="search-bar">
            <search-bar
                v-model:filtered-items="filteredItems"
                :items="contactsStore.items"
                :item-keys="['email', 'name', 'phone']"
                :disabled="isLoading"
                :placeholder="!isLoading ? 'Поиск' : 'Загрузка...'"
                class="search-bar"
            />
            <span class="open-modal-icn" @click="formIsOpened = true"> + </span>
        </div>

        <contacts-list
            :items="filteredItems"
            @edit="
                (item) => {
                    itemToEdit = item;
                    editModelOpened = true;
                }
            "
        />
    </div>

    <contact-form v-model="formIsOpened" @create-contact="(newItem) => contactsStore.createItem(newItem)" />
    <contact-form
        v-model="editModelOpened"
        v-model:item="itemToEdit"
        @create-contact="(updatedItem) => contactsStore.update(updatedItem)"
    />
</template>

<style lang="scss">
@use './../styles/colors';

.main {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    width: 80%;
    margin: auto;
    padding-top: 50px;
}

.search-bar {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
}

.open-modal-icn {
    cursor: pointer;
    user-select: none;

    padding: 8px 12px;

    font-size: 1.5rem;
    color: colors.$background-secondary;
    text-align: center;

    border: 1px solid colors.$border-accent;
    border-radius: 3px;
}
</style>
