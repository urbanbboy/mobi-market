import React, { useState } from 'react';
import { InputHTMLAttributes } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>;

interface InputProps extends HTMLInputProps {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    fullWidth?: boolean;
    isLast?: boolean;
    readOnly?: boolean;
}

export const Input = (props: InputProps) => {
    const {
        value,
        label,
        onChange,
        fullWidth,
        isLast,
        readOnly,
        type = 'text',
        ...otherProps
    } = props;

    const inputClasses = [
        cls.input,
        fullWidth ? cls.fullwidth : '',
        isLast ? cls.isLast : '',
        readOnly ? cls.readOnly : ''
    ].join(' ')

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
                className={inputClasses}
                value={value}
                readOnly={readOnly}
                onChange={onChangeHandler}
                {...otherProps}
            />
            {type === 'password' && (
                <div className={cls.eyeIcon} onClick={togglePasswordVisibility}>
                    {showPassword ? (
                        <img src={'/show_pass.svg'} alt="Show password" />
                    ) : (
                        <img src={'/hide_pass.svg'} alt="Hide password" />
                    )}
                </div>
            )}
            <span className={cls.highlight}></span>
            <span className={cls.bar}></span>
            <label>{label}</label>
        </div>
    );
};
