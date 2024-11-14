import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useContactsApi } from '../api/contactsApi';
import { Contact, IContact } from '../types/Contact';

export const useContactsStore = defineStore(
    'contacts',
    () => {
        const contactsApi = useContactsApi();
        const items = ref<Contact[]>([]);

        function createItem(item: IContact) {
            return contactsApi.createItem(item).then((newItem) => items.value.push(new Contact(newItem)));
        }

        function loadList() {
            return contactsApi.loadList().then((newItems) => {
                if (Array.isArray(newItems)) {
                    items.value = newItems.map((newItem) => new Contact(newItem));
                } else items.value = [];
            });
        }

        function update(itemToUpdate: Contact) {
            return contactsApi.update(itemToUpdate).then((updatedItem) => {
                updatedItem = new Contact(updatedItem);

                items.value = items.value.map((item) => (item.id === updatedItem.id ? updatedItem : item));
            });
        }

        function remove(id: string) {
            return contactsApi.remove(id).then((itemToDelete) => {
                const deletedItem = new Contact(itemToDelete);

                items.value = items.value.filter((item) => item.id !== deletedItem.id);
            });
        }

        return {
            items,
            createItem,
            loadList,
            update,
            remove,
        };
    },
    { persist: true }
);
