import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@shared/ui/Button'
import { ResetPasswordInput } from '../ResetForm/ResetPasswordInput/ResetPasswordInput'
import { getLoginState } from '../../../../model/selectors/getLoginState/getLoginState'
import { loginActions } from '../../../../model/slice/loginSlice'
import { forgotPassword } from '../../../../model/service/forgotPassword/forgotPassword'
import cls from './FirstResetForm.module.scss'
import { AuthLoader } from '@shared/ui/AuthLoader/AuthLoader'

interface FirstResetFormProps {
    onSuccess: () => void
}

export const FirstResetForm = ({ onSuccess }: FirstResetFormProps) => {
    const dispatch = useAppDispatch()
    const {
        phoneNumber = '',
        phoneIsLoading,
        forgotError
    } = useSelector(getLoginState)

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPhone(value))
    }, [dispatch])

    const onClickSendPhoneNumber = useCallback(async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        
        const phone = phoneNumber.replace(/[^\d]/g, '')
        const result = await dispatch(forgotPassword({ phone }))
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }
    }, [dispatch, phoneNumber, onSuccess])

    useEffect(() => {
        if (forgotError) {
            toast.error(forgotError);
        }
    }, [forgotError]);
    return (
        <div className={cls.Form}>
            <form onSubmit={onClickSendPhoneNumber}>
                <div className={cls.Title}>Введите номер телефона</div>
                <img
                    src={'/phone.svg'}
                    alt="phone"
                    className={cls.Logo}
                />
                <div className={cls.SubTitle}>Введите номер телефона</div>
                <p className={cls.Text}>Мы отправим вам СМС с кодом <br /> подтверждения</p>
                <div className={cls.Input}>
                    <ResetPasswordInput
                        isPhoneNumber
                        onChange={onChangePassword}
                        value={phoneNumber}
                    />
                </div>
                {phoneNumber === '' &&
                    <Button
                        theme={ButtonTheme.CLEANED}
                        disabled={true}
                        fullWidth
                    >
                        Далее
                    </Button>}
                {phoneNumber.length > 0 &&
                    <Button
                        type='submit'
                        theme={ButtonTheme.CONTAINED_WITH_WIDTH}
                        disabled={phoneIsLoading}
                        fullWidth
                    >
                        {phoneIsLoading ? <AuthLoader /> : 'Далее'}
                    </Button>}
            </form>
        </div>
    )
}
