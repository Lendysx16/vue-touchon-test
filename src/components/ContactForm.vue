<script setup lang="ts" generic="T extends IContact">
import { reactive } from 'vue';

import { IContact, schema } from '../types/Contact';

type Emits = {
    (e: 'create-contact', item: T): void;
};

const isOpened = defineModel<boolean>();
const emits = defineEmits<Emits>();

const item = defineModel<T>('item', { default: () => ({}) });

const errors = reactive<Partial<IContact>>({});

function handleSubmit() {
    errors.email = '';
    errors.name = '';
    errors.phone = '';

    const res = schema.safeParse(item.value);

    if (res.error) {
        const errorMessages = res.error.formErrors.fieldErrors;

        const keysOfErrorMessages = Object.keys(res.error.formErrors.fieldErrors) as ('email' | 'phone' | 'name')[];

        keysOfErrorMessages.forEach((errorName) => (errors[errorName] = errorMessages[errorName]?.[0]));
    } else {
        emits('create-contact', item.value);
        isOpened.value = false;
        item.value.email = '';
        item.value.name = '';
        item.value.phone = '';
    }
}
</script>

<template>
    <Teleport to="Body">
        <div v-show="isOpened" class="modal" @click="isOpened = false">
            <form class="form" @submit.prevent="handleSubmit" @click.stop>
                <div class="form-values">
                    <label> Имя</label>
                    <input v-model="item.name" type="text" class="form-input" />
                    <span v-if="errors.name" class="form-error"> {{ errors.name }}</span>
                </div>
                <div class="form-values">
                    <label> Email</label>
                    <input v-model="item.email" type="text" class="form-input" />
                    <span v-if="errors.email" class="form-error"> {{ errors.email }}</span>
                </div>
                <div class="form-values">
                    <label> Телефон</label>
                    <input v-model.trim="item.phone" type="text" class="form-input" />
                    <span v-if="errors.phone" class="form-error"> {{ errors.phone }}</span>
                </div>

                <button class="form-button">Сохранить</button>
            </form>
        </div>
    </Teleport>
</template>

<style lang="scss">
@use './../styles/colors';

.modal {
    position: absolute;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;

    width: 100%;
    height: 100svh;

    background: rgba(colors.$background-secondary, 0.8);
}

.form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    width: 450px;
    margin: auto;
    padding: 35px;

    background-color: colors.$background-secondary;
    border-radius: 5px;
}

.form-input {
    padding: 5px 10px;

    color: colors.$text-accent;

    background: none;
    border: 1px solid colors.$border;
    border-radius: 2px;

    transition: border 0.2s ease;

    &:focus-visible {
        border: 1px solid colors.$background;
    }
}

.form-values {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: colors.$text-accent;

    label {
        font-size: 0.75rem;
    }
}

.form-button {
    cursor: pointer;

    margin-top: 10px;
    padding: 7px;

    color: colors.$text-accent;

    background-color: colors.$background-secondary;
    border: 1px solid colors.$border;
    border-radius: 3px;

    transition: all 0.5s ease;

    &:hover {
        color: colors.$background-secondary;
        background-color: colors.$primary;
    }
}

.form-error {
    font-size: 0.6rem;
    font-weight: 200;
    color: colors.$danger;
}
</style>
