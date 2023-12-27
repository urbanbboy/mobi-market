import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import cls from './Button.module.scss';

export enum ButtonTheme {
    CONTAINED = 'contained',
    CONTAINED_WITH_WIDTH = 'contained_with_width',
    // DISABLED = 'disabled',
    OUTLINED = 'outlined',
    CLEANED = 'cleaned',
    ACTION = 'action',
    CONTAINED_RED = 'contained_red',
    CONTAINED_GREEN = 'contained_green'
}

const themeClasses = {
    [ButtonTheme.CONTAINED]: cls.contained,
    [ButtonTheme.CONTAINED_WITH_WIDTH]: cls.contained_with_width,
    [ButtonTheme.CLEANED]: cls.cleaned,
    [ButtonTheme.ACTION]: cls.action,
    // [ButtonTheme.DISABLED]: cls.disabled,
    [ButtonTheme.OUTLINED]: cls.outlined,
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