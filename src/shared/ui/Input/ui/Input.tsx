import React, { useState } from 'react';
import { InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
}

export const Input = (props: InputProps) => {
    const {
        value,
        label,
        onChange,
        type = 'text',
        ...otherProps
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && !showPassword ? 'password' : 'text';

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={cls.group}>
            <input
                required
                type={inputType}
                className={cls.input}
                value={value}
                onChange={onChangeHandler}
                {...otherProps}
            />
            {type === 'password' && (
                <div className={cls.eyeIcon} onClick={togglePasswordVisibility}>
                    {showPassword ? (
                        <img src={'/public/show_pass.svg'} alt="Show password" />
                    ) : (
                        <img src={'/public/hide_pass.svg'} alt="Hide password" />
                    )}
                </div>
            )}
            <span className={cls.highlight}></span>
            <span className={cls.bar}></span>
            <label>{label}</label>
        </div>
    );
};
