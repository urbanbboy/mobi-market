import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import cls from './Button.module.scss';

export enum ButtonTheme {
    CONTAINED = 'contained',
    CLEANED = 'cleaned',
    ACTION = 'action',
    CONTAINED_RED = 'contained_red',
    CONTAINED_GREEN = 'contained_green'
}

const themeClasses = {
    [ButtonTheme.CONTAINED]: cls.contained,
    [ButtonTheme.CLEANED]: cls.cleaned,
    [ButtonTheme.ACTION]: cls.action,
    [ButtonTheme.CONTAINED_RED]: cls.contained_red,
    [ButtonTheme.CONTAINED_GREEN]: cls.contained_green,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    theme?: ButtonTheme;
    fullWidth?: boolean;
}

export const Button = memo(({
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
        disabled ? cls.disabled : ''
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
});