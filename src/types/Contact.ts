import { z } from 'zod';

const phoneRegex = new RegExp(/^((8|\+7)[- ]?)+(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/);

export const schema = z.object({
    email: z.string({ message: 'Поле обязательно для заполнения' }).email({ message: 'Невалидный email' }),
    phone: z
        .string({ message: 'Поле обязательно для заполнения' })
        .regex(phoneRegex, { message: 'Невалидный номер телефона' }),
    name: z.string({ message: 'Поле обязательно для заполнения' }).min(2, { message: 'Имя должно быть от 2 символов' }),
});

export interface IContact extends z.infer<typeof schema> {
    id?: string;
}

export class Contact implements IContact {
    id: string;
    email: string;
    phone: string;
    name: string;

    constructor(raw: { [key: string]: string | number | boolean }) {
        this.id = String(raw['id']);
        this.email = String(raw['email']);
        this.phone = String(raw['phone']);
        this.name = String(raw['name']);
    }
}
