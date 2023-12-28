import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ResetPasswordInput } from '../ResetForm/ResetPasswordInput/ResetPasswordInput'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'
import { loginActions } from '../../../../model/slice/loginSlice'
import { getLoginState } from '../../../../model/selectors/getLoginState/getLoginState'
import { sendCode } from '../../../../model/service/sendCode/sendCode'
import cls from './SecondResetForm.module.scss'
import { Button, ButtonTheme } from '@shared/ui/Button'
import { forgotPassword } from '../../../../model/service/forgotPassword/forgotPassword'

interface SecondResetFormProps {
    onSuccess: () => void;
}

export const SecondResetForm = ({ onSuccess }: SecondResetFormProps) => {
    const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(60);
    const hasSentRequestRef = useRef<boolean>(false);

    const dispatch = useAppDispatch()
    const {
        phoneCode: code,
        phoneCodeError,
        phoneIsLoading,
        phoneNumber = ''
    } = useSelector(getLoginState)

    const onChangeCode = useCallback((value: string) => {
        dispatch(loginActions.setCode(value))
        hasSentRequestRef.current = false;
    }, [dispatch])

    useEffect(() => {
        let timerInterval: number;

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
        const fetchCode = async () => {
            if (code && /^\d{4}$/.test(code) && !hasSentRequestRef.current) {
                hasSentRequestRef.current = true;
                const result = await dispatch(sendCode({ code }));
                if (result.meta.requestStatus === 'fulfilled') {
                    onSuccess()
                }
            }
        }
        fetchCode()
    }, [code, dispatch, onSuccess]);

    const resendCode = () => {
        const phone = phoneNumber.replace(/[^\d]/g, '')
        dispatch(forgotPassword({ phone }))

        setButtonDisabled(true)

        setTimeout(() => {
            setButtonDisabled(false)
            setCountdown(600)
            hasSentRequestRef.current = false;
        }, 60000);

    }

    return (
        <div className={cls.Form}>
            <div className={cls.FormWrapper}>
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
                    disabled={isButtonDisabled || phoneIsLoading}
                >
                    Отправить код еще раз
                </Button>
                <div>
                    {isButtonDisabled && <span>Повторный запрос <br /> 0:{countdown}</span>}
                </div>
            </div>

        </div>
    )
}
