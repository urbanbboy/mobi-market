import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[^0-9\W]\w*$/;

export const AuthValidation = Yup.object().shape({
    username: Yup.string()
        .required("Пожалуйста, заполните это поле"),
    password: Yup.string()
        .required("Пожалуйста, заполните это поле"),
})

export const registerValidation = Yup.object().shape({
    username: Yup.string()
        .matches(usernameRegex, "Неверный логин")
        .required("Пожалуйста, заполните это поле"),
    email: Yup.string()
        .matches(emailRegex, "Неверный формат почты")
        .required("Пожалуйста, заполните это поле"),
})