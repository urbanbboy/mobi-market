import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ResetPasswordInput } from '../ResetForm/ResetPasswordInput/ResetPasswordInput'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'
import { loginActions } from '../../../../model/slice/loginSlice'
import { getLoginState } from '../../../../model/selectors/getLoginState/getLoginState'
import { sendCode } from '../../../../model/service/sendCode/sendCode'
import cls from './SecondResetForm.module.scss'
import { Button, ButtonTheme } from '@shared/ui/Button'
import { forgotPassword } from '../../../../model/service/forgotPassword/forgotPassword'

export const SecondResetForm = () => {
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(60);

    const dispatch = useAppDispatch()
    const {
        phoneCode: code,
        phoneCodeError,
        phoneIsLoading,
        phoneNumber = ''
    } = useSelector(getLoginState)

    const onChangeCode = useCallback((value: string) => {
        dispatch(loginActions.setCode(value))
        console.log(value)
    }, [dispatch])

    useEffect(() => {
        let timerInterval: NodeJS.Timeout;

        if (isButtonDisabled) {
            timerInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [isButtonDisabled]);

    useEffect(() => {
        if (code && /^\d{4}$/.test(code)) {
            dispatch(sendCode({ code }));
        }
    }, [code, dispatch]);

    const resendCode = () => {
        const phone = phoneNumber.replace(/[^\d]/g, '')
        dispatch(forgotPassword({ phone }))
        setIsResendEnable(false)
        if (!setIsResendEnable) {
            setInterval(() => {
                setSecondsRemaining((prev) => prev - 1)
            }, 1000)
            console.log(secondsRemaining)
        }

    }

    useEffect(() => {
        if (secondsRemaining === 0) {
            setIsResendEnable(true)
        }
    }, [secondsRemaining])

    return (
        <div className={cls.Form}>
            <div className={cls.Title}>Сброс пароля</div>
            <img
                className={cls.Logo}
                src={'/user.svg'}
                alt="user"
            />
            <div className={cls.SubTitle}>Введите код из СМС</div>
            <div className={cls.Input}>
                <ResetPasswordInput
                    onChange={onChangeCode}
                    value={code}
                />
            </div>
            {phoneCodeError && <div className={cls.Error}>Неверный код</div>}
            <Button
                onClick={resendCode}
                theme={ButtonTheme.OUTLINED}
                disabled={!isResendEnable || phoneIsLoading}
            >
                Отправить код еще раз
            </Button>
            <div>
                {!isResendEnable && <span>Повторный запрос доступен через <br /> 0:{secondsRemaining}</span>}
            </div>
        </div>
    )
}
