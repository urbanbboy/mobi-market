import { Input } from "@shared/ui/Input"
import { Button, ButtonTheme } from '@shared/ui/Button'
import { AuthLoader } from '@shared/ui/AuthLoader/AuthLoader'
import { memo, useCallback, useEffect, useState } from 'react'
import { registerActions } from "../../model/slice/registerSlice"
import cls from './SecondForm.module.scss'
import { registerUser } from "../../model/service/registerUser/registerUser"
import { useSelector } from "react-redux"
import { getRegisterState } from "../../model/selectors/getRegisterState/getRegisterState"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Errors } from "@features/RegisterUser/model/types/registerSchema"
import { registerValidation } from "@shared/validation/registerValidation"
import { useNavigate } from "react-router-dom"
import { RoutePath } from "@app/providers/router"
import { toast } from "react-toastify"

export const SecondForm = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState<Errors>({});

    const {
        username,
        email,
        password,
        confirmPassword,
        isLoading, 
        registerError 
    } = useSelector(getRegisterState)

    const validateForm = useCallback(() => {
        let hasErrors = false;
        const newErrors: Errors = {};

        try {
            registerValidation.validateSync({ password, confirmPassword }, { abortEarly: false });
        } catch (validationError: any) {
            validationError.inner.forEach((error: any) => {
                newErrors[error.path] = error.message;
            });
            hasErrors = true;
        }

        setErrors(newErrors);
        return hasErrors;
    }, [password, confirmPassword]);

    const onChangePassword = useCallback((value: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        dispatch(registerActions.setPassword(value))
    }, [dispatch])

    const onChangeConfirmPassword = useCallback((value: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
        dispatch(registerActions.setConfirmPassword(value))
    }, [dispatch])

    const onClickRegister = useCallback(async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        const hasFormErrors = validateForm()
        if (!hasFormErrors) {
            const result = await dispatch(registerUser({ username, email, password, confirmPassword }));
            if (result.meta.requestStatus === 'fulfilled') {
                navigate(RoutePath.products)
                toast.success('Закончите регистрицию на странице профиля')
            }
        }
    }, [dispatch, username, email, password, confirmPassword, validateForm, navigate])

    useEffect(() => {
        if (registerError) {
            toast.error(registerError);
        }
    }, [registerError]);

    return (
        <div className={cls.Form}>
            <div className={cls.Form_info}>
                <img src="/lock.svg" alt="password" />
                <div>Придумайте пароль</div>
                <p>Минимальная длина — 8 символов. Для надежности пароль должен содержать буквы и цифры.</p>
            </div>
            <form onSubmit={onClickRegister} noValidate>
                <div className={cls.Form_input_username}>
                    <Input
                        label={'Пароль'}
                        type='password'
                        onChange={onChangePassword}
                        value={password}
                    />
                    {errors.password && <div className={cls.Error}>{errors.password}</div>}
                </div>
                <div className={cls.Form_input_email}>
                    <Input
                        label={'Повторите пароль'}
                        type='password'
                        onChange={onChangeConfirmPassword}
                        value={confirmPassword}
                    />
                    {errors.confirmPassword && <div className={cls.Error}>{errors.confirmPassword}</div>}
                </div>
                <Button
                    theme={ButtonTheme.CONTAINED}
                    type='submit'
                    fullWidth={true}
                >
                    {isLoading ? <AuthLoader /> : 'Готово'}
                </Button>
            </form>
        </div>
    )
})
