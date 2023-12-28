import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[^0-9\W]\w*$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).+$/;

export const checkUserValidation = Yup.object().shape({
    username: Yup.string()
        .matches(usernameRegex, "Неверный логин")
        .required("Пожалуйста, заполните это поле"),
    email: Yup.string()
        .matches(emailRegex, "Неверный формат почты")
        .required("Пожалуйста, заполните это поле"),
})

export const registerValidation = Yup.object().shape({
    password: Yup.string()
        .min(8, "Минимальное количество символов 8")
        .matches(passwordRegex, "Неверный формат пароля")
        .required("Пожалуйста, заполните это поле."),
    confirmPassword: Yup.string()
        .min(8, "Минимальное количество символов 8")
        .matches(passwordRegex, "Неверный формат пароля")
        .oneOf([Yup.ref("password")], "Пароли не совпадают")
        .required("Пожалуйста, заполните это поле.")
        .test('passwords-match', 'Пароли не совпадают', function (value) {
            return this.parent.password === value;
        }),
});

export const resetValidation = Yup.object().shape({
    resetPassword: Yup.string()
        .min(8, "Минимальное количество символов 8")
        .matches(passwordRegex, "Неверный формат пароля")
        .required("Пожалуйста, заполните это поле."),
    resetConfirmPassword: Yup.string()
        .min(8, "Минимальное количество символов 8")
        .matches(passwordRegex, "Неверный формат пароля")
        .oneOf([Yup.ref("resetPassword")], "Пароли не совпадают")
        .required("Пожалуйста, заполните это поле.")
        .test('passwords-match', 'Пароли не совпадают', function (value) {
            return this.parent.resetPassword === value;
        }),
});