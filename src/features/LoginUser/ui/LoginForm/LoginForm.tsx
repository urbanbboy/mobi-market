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
import { useState } from 'react'

export const LoginForm = () => {
    const dispatch = useAppDispatch()
    const { username, password, isLoading } = useSelector(getLoginState)
    const [errors, setErrors] = useState<Errors>({});

    const validateField = async (fieldName: string, value: string) => {
        try {
            await AuthValidation.validateAt(fieldName, { [fieldName]: value });
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: null }));
        } catch (error: any) {
            setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error.message }));
        }
    };

    const onChangeUsername = (value: string) => {
        validateField('username', value);
        dispatch(loginActions.setUsername(value))
    }

    const onChangePassword = (value: string) => {
        validateField('password', value);
        dispatch(loginActions.setPassword(value))
    }

    const onLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // await AuthValidation.validate({ username, password });
        dispatch(loginByUsername({ username, password }))
    }

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
}
