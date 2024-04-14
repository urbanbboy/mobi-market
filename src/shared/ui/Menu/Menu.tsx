import cls from './Menu.module.scss'

interface MenuProps {
    onToggleMenu: () => void;
}

export const Menu = (props: MenuProps) => {
    const { onToggleMenu } = props

    return (
        <div className={cls.MenuToggler} onClick={onToggleMenu} >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
