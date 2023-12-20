import { InputHTMLAttributes } from "react"
import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    value?: string;
    onChange?: (value: string) => void
    label?: string;
}

export const Input = (props: InputProps) => {
    const {
        value,
        label,
        onChange,
        type = 'text',
        ...otherProps
    } = props

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    return (
        <div className={cls.group}>
            <input
                required
                type={type}
                className={cls.input}
                value={value}
                onChange={onChangeHandler}
                {...otherProps}
            />
            <span className={cls.highlight}></span>
            <span className={cls.bar}></span>
            <label>{label}</label>
        </div>
    )
}
