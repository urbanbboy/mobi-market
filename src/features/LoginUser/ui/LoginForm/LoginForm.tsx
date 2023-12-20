import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input } from "@shared/ui/Input"
import { Button, ButtonTheme } from '@shared/ui/Button'
import { AuthValidation } from '@shared/validation/authValidation'
import { AuthLoader } from '@shared/ui/AuthLoader/AuthLoader'
import { useAppDispatch } from '@shared/hooks/useAppDispatch/useAppDispatch'
import { Errors } from '../../model/types/LoginSchema'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginActions } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/service/loginByUsername/loginByUsername'
import cls from './LoginForm.module.scss'
import { memo, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const LoginForm = memo(() => {
    const dispatch = useAppDispatch();
    const { username, password, isLoading, loginError } = useSelector(getLoginState);
    const [errors, setErrors] = useState<Errors>({});

    const validateForm = useCallback(() => {
        let hasErrors = false;
        const newErrors: Errors = {};

        try {
            AuthValidation.validateSync({ username, password }, { abortEarly: false });
        } catch (validationError: any) {
            validationError.inner.forEach((error: any) => {
                newErrors[error.path] = error.message;
            });
            hasErrors = true;
        }

        setErrors(newErrors);
        return hasErrors;
    }, [password, username]);

    const onLoginClick = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasFormErrors = validateForm();
        if (!hasFormErrors) {
            dispatch(loginByUsername({ username, password }));
        }
    }, [dispatch, username, password, validateForm]);

    const onChangeUsername = useCallback((value: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    useEffect(() => {
        if (loginError) {
            toast.error(loginError);
        }
    }, [loginError]);

    return (
        <div className={cls.Form}>
            <form onSubmit={onLoginClick} noValidate>
                <div className={cls.Form_input_username}>
                    <Input
                        id="username"
                        name="username"
                        label={'Имя пользователя'}
                        type='text'
                        onChange={onChangeUsername}
                        value={username}
                    />
                    {errors.username && <div className={cls.Error}>{errors.username}</div>}
                </div>
                <div className={cls.Form_input_password}>
                    <Input
                        id="password"
                        name="password"
                        label={'Пароль'}
                        type='password'
                        onChange={onChangePassword}
                        value={password}
                    />
                    {errors.password && <div className={cls.Error}>{errors.password}</div>}
                </div>
                <div className={cls.Form_forgot}>
                    <Link to={'/forgotpassword'} className={cls.Form_forgot_link}>Забыли пароль</Link>
                </div>
                <Button
                    theme={ButtonTheme.CONTAINED}
                    type='submit'
                    disabled={isLoading}
                    fullWidth={true}
                >
                    {isLoading ? <AuthLoader /> : 'Войти'}
                </Button>
            </form>
        </div>
    )
})
