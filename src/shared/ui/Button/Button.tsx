import { ButtonHTMLAttributes, ReactNode,  } from "react"
import cls from './Button.module.scss'

export enum ButtonTheme {
    CONTAINED = 'contained'
}

const themeClasses = {
    [ButtonTheme.CONTAINED]: cls.contained,
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    theme?: ButtonTheme;
}

export const Button = (props: ButtonProps) => {
    const {
        children,
        active,
        disabled,
        theme,
        ...otherProps
    } = props

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
    )
}
