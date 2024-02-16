import { Input } from "@shared/ui/Input"
import { AuthLoader } from '@shared/ui/AuthLoader/AuthLoader'
import { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { resetValidation } from "@shared/validation/registerValidation"
import { Button, ButtonTheme } from '@shared/ui/Button'
import { getLoginState } from "../../../../model/selectors/getLoginState/getLoginState"
import { loginActions } from "../../../../model/slice/loginSlice"
import { resetUserPassword } from "../../../../model/service/resetPassword/resetPassword"
import { Errors } from "../../../../model/types/LoginSchema"
import cls from './ThirdForm.module.scss'
import { RoutePath } from "@shared/config"

export const ThirdForm = memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        resetPassword = '',
        resetConfirmPassword = '',
        resetError,
        resetIsLoading
    } = useSelector(getLoginState)
    const [errors, setErrors] = useState<Errors>({});

    const validateForm = useCallback(() => {
        let hasErrors = false;
        const newErrors: Errors = {};

        try {
            resetValidation.validateSync({ resetPassword, resetConfirmPassword }, { abortEarly: false });
        } catch (validationError: any) {
            validationError.inner.forEach((error: any) => {
                newErrors[error.path] = error.message;
            });
            hasErrors = true;
        }

        setErrors(newErrors);
        return hasErrors;
    }, [resetPassword, resetConfirmPassword]);

    const onChangePassword = useCallback((value: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, resetPassword: '' }));
        dispatch(loginActions.setResetPassword(value))
    }, [dispatch])

    const onChangeConfirmPassword = useCallback((value: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, resetConfirmPassword: '' }));
        dispatch(loginActions.setResetConfirmPassword(value))
    }, [dispatch])

    const onClickRegister = useCallback(async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const hasFormErrors = validateForm()
        if (!hasFormErrors) {
            const result = await dispatch(resetUserPassword({ resetPassword, resetConfirmPassword }));
            if (result.meta.requestStatus === 'fulfilled') {
                navigate(RoutePath.products)
                toast.success('Пароль успешно обновлен')
            }
        }
    }, [dispatch, resetPassword, resetConfirmPassword, validateForm, navigate])

    useEffect(() => {
        if (resetError) {
            toast.error(resetError);
        }
    }, [resetError]);

    return (
        <div className={cls.Form}>
            <div className={cls.FormWrapper}>
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
                            value={resetPassword}
                        />
                        {errors.resetPassword && <div className={cls.Error}>{errors.resetPassword}</div>}
                    </div>
                    <div className={cls.Form_input_email}>
                        <Input
                            label={'Повторите пароль'}
                            type='password'
                            onChange={onChangeConfirmPassword}
                            value={resetConfirmPassword}
                        />
                        {errors.resetConfirmPassword && <div className={cls.Error}>{errors.resetConfirmPassword}</div>}
                    </div>
                    <Button
                        theme={ButtonTheme.CONTAINED}
                        type='submit'
                        fullWidth={true}
                    >
                        {resetIsLoading ? <AuthLoader /> : 'Готово'}
                    </Button>
                </form>
            </div>
        </div>
    )
})
