import { ButtonHTMLAttributes, ReactNode } from "react";
import cls from './Button.module.scss';

export enum ButtonTheme {
    CONTAINED = 'contained',
    DISABLED = 'disabled'
}

const themeClasses = {
    [ButtonTheme.CONTAINED]: cls.contained,
    [ButtonTheme.DISABLED]: cls.disabled,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    active?: boolean;
    disabled?: boolean;
    theme?: ButtonTheme;
}

export const Button = ({
    children,
    active,
    disabled,
    theme,
    ...otherProps
}: ButtonProps) => {

    const buttonClasses = [
        cls.Button,
        theme ? themeClasses[theme] : '',
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