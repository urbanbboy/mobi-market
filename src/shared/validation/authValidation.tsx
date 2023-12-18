import * as Yup from "yup";

const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const AuthValidation = Yup.object().shape({
    username: Yup.string()
        .min(3, "Слишком коротко")
        .max(30, "Имя пользователя не может быть длиннее 30 символов")
        .matches(emailRegExp, "Неверный адрес электронной почты")
        .required("Пожалуйста, заполните это поле"),
    password: Yup.string()
        .min(8, "Минимальное количество символов должно составлять 8")
        .max(20, "Пароль не может быть длиннее 20 символов")
        .required("Пожалуйста, заполните это поле"),
})