// validationUtils.ts
import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup'; // или любой другой путь к вашему валидатору

interface Errors {
    [key: string]: string| null;
}

interface ValidationParams<T> {
    data: T;
    setErrors: Dispatch<SetStateAction<Errors>>;
    validateFunction: (data: T) => void; // Тип функции валидации, принимающей T и возвращающей void
}

export function formValidate<T>({
    data,
    setErrors,
    validateFunction
}: ValidationParams<T>): boolean {
    let hasErrors = false;
    const newErrors: Errors = {};

    try {
        validateFunction(data);
    } catch (validationError) {
        if (validationError instanceof Yup.ValidationError) {
            validationError.inner.forEach((error: any) => {
                newErrors[error.path] = error.message;
            });
            hasErrors = true;
        }
    }

    setErrors(newErrors);
    return hasErrors;
}
