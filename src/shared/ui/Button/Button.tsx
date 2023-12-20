import { ButtonHTMLAttributes, ReactNode } from "react";
import cls from './Button.module.scss';

export enum ButtonTheme {
    CONTAINED = 'contained',
}

const themeClasses = {
    [ButtonTheme.CONTAINED]: cls.contained,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    active?: boolean;
    disabled?: boolean;
    theme?: ButtonTheme;
    fullWidth?: boolean;
}

export const Button = ({
    children,
    active,
    disabled,
    theme,
    fullWidth,
    ...otherProps
}: ButtonProps) => {

    const buttonClasses = [
        cls.Button,
        theme ? themeClasses[theme] : '',
        fullWidth ? cls.fullWidth : '',
        disabled ? cls.diabled : ''
    ].join(' ');

    return (
        <button
            type="button"
            className={buttonClasses}
            {...otherProps}
            disabled={disabled}
        >
            {children}
        </button>
    );
};