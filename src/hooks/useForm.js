import { useState } from 'react';

export const useForm = (initialState = {}) => {

    const [form, setForm] = useState(initialState);

    const reset = (values = initialState) => setForm(values);
    const inputChange = ({ target }) => setForm({ ...form, [target.name] : target.value });

    return [
        form,
        inputChange,
        reset
    ];
}
