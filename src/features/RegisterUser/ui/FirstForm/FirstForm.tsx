import { useSelector } from 'react-redux'
import { Input } from "@shared/ui/Input"
import { Button, ButtonTheme } from '@shared/ui/Button'
import { AuthLoader } from '@shared/ui/AuthLoader/AuthLoader'
import { memo, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getRegisterState } from '../../model/selectors/getRegisterState/getRegisterState'
import { registerActions } from '../../model/slice/registerSlice'
import cls from './FirstForm.module.scss'
import { checkUser } from '../../model/service/checkUser/checkUser'
import { CheckUserProps, Errors } from '../../model/types/registerSchema'
import { checkUserValidation } from '@shared/validation/registerValidation'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'

interface FirstFormProps {
    onSuccess: () => void
}

export const FirstForm = memo(({onSuccess}: FirstFormProps) => {
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<Errors>({});
    const {
        username,
        email,
        registerError,
        isLoading
    } = useSelector(getRegisterState);

    const validateForm = useCallback(() => {
        let hasErrors = false;
        const newErrors: Errors = {};

        try {
            checkUserValidation.validateSync({ username, email }, { abortEarly: false });
        } catch (validationError: any) {
            validationError.inner.forEach((error: any) => {
                newErrors[error.path] = error.message;
            });
            hasErrors = true;
        }

        setErrors(newErrors);
        return hasErrors;
    }, [email, username]);

    const onChangeUsername = useCallback((value: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
        dispatch(registerActions.setUsername(value));
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        dispatch(registerActions.setEmail(value));
    }, [dispatch]);

    const onClickCheck = useCallback(async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hasFormErrors = validateForm();
        if (!hasFormErrors) {
            const result = await dispatch(checkUser({ username, email }));
            if (result.meta.requestStatus === 'fulfilled') {
                const { username: checkedUsername, email: checkedEmail } = result.payload as unknown as CheckUserProps
                if (checkedUsername) {
                    toast.error('Данный пользователь уже зарегистрирован');
                } else if (checkedEmail) {
                    toast.error('Неверный формат почты')
                } else {
                    onSuccess();
                }
            }
        }
    }, [dispatch, email, username, validateForm, onSuccess])

    useEffect(() => {
        if (registerError) {
            toast.error(registerError);
        }
    }, [registerError]);

    return (
        <div className={cls.Form}>
            <form onSubmit={onClickCheck} noValidate>
                <div className={cls.Form_input_username}>
                    <Input
                        label={'Имя пользователя'}
                        type='text'
                        onChange={onChangeUsername}
                        value={username}
                    />
                    {errors.username && <div className={cls.Error}>{errors.username}</div>}
                </div>
                <div className={cls.Form_input_email}>
                    <Input
                        label={'Почта'}
                        type='text'
                        onChange={onChangeEmail}
                        value={email}
                    />
                    {errors.email && <div className={cls.Error}>{errors.email}</div>}
                </div>
                <Button
                    theme={ButtonTheme.CONTAINED}
                    type='submit'
                    disabled={isLoading}
                    fullWidth={true}
                >
                    {isLoading ? <AuthLoader /> : 'Далее'}
                </Button>
            </form>
        </div>
    )
})
