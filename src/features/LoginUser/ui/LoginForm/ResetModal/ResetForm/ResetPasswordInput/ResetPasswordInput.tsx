import ReactInputMask from 'react-input-mask'
import cls from './ResetPasswordInput.module.scss'

interface ResetPasswordInput {
    value?: string;
    onChange?: (value: string) => void;
    isPhoneNumber?: boolean;
}

export const ResetPasswordInput = (props: ResetPasswordInput) => {
    const {
        value,
        onChange = () => { },
        isPhoneNumber
    } = props

    const mask = isPhoneNumber ? "0(999) 999 999" : "9999"
    const placeholder = isPhoneNumber ? '0(000) 000 000' : "0000"

    return (
        <ReactInputMask
            mask={mask}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            id="phone"
            name="phone"
            className={cls.Input}
        />
    )

};