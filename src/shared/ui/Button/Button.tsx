import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import cls from './Button.module.scss';

export enum ButtonTheme {
    CONTAINED = 'contained',
    CLEANED = 'cleaned'
}

const themeClasses = {
    [ButtonTheme.CONTAINED]: cls.contained,
    [ButtonTheme.CLEANED]: cls.cleaned,
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
});