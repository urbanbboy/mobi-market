import { HTMLAttributes, ReactNode } from "react"
import cls from './Card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const Card = (props: CardProps) => {
    const { children, ...otherProps } = props
    
    return (
        <article className={cls.Card} {...otherProps}>
            {children}
        </article>
    )
}
