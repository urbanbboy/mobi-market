import * as Yup from "yup";

export const AuthValidation = Yup.object().shape({
    username: Yup.string()
        .required("Пожалуйста, заполните это поле"),
    password: Yup.string()
        .required("Пожалуйста, заполните это поле"),
})
