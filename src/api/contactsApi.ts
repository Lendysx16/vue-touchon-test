import { Contact, IContact } from '../types/Contact';

export default class contactsApi {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async loadList() {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error('error loading list');
        }

        const data = await response.json();

        return data;
    }

    async loadItem(id: number) {
        const response = await fetch(`${this.baseUrl}${id}`);
        if (!response.ok) {
            throw new Error('error loading list');
        }

        const data = await response.json();

        return data;
    }

    async createItem(contact: IContact) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('error loading list');
        }

        const data = await response.json();

        return data;
    }

    async update(contact: Contact) {
        const response = await fetch(`${this.baseUrl}${contact.id}`, {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('error loading list');
        }

        const data = await response.json();

        return data;
    }

    async remove(id: string) {
        const response = await fetch(`${this.baseUrl}${id}`, { method: 'Delete' });
        if (!response.ok) {
            throw new Error('error loading list');
        }

        const data = await response.json();

        return data;
    }
}

export const useContactsApi = () => new contactsApi('http://localhost:3000/contacts/');
