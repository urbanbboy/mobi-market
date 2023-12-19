import * as Yup from "yup";

// const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const AuthValidation = Yup.object().shape({
    username: Yup.string()
        .required("Пожалуйста, заполните это поле"),
    password: Yup.string()
        .required("Пожалуйста, заполните это поле"),
})