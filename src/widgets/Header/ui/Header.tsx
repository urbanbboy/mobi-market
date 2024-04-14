import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu } from "@shared/ui/Menu"
import { RoutePath } from "@shared/config"
import { Logo } from "./Logo"
import { Profile } from "./Profile"
import { AddProduct } from "./AddProduct"
import cls from './Header.module.scss'

export const Header = () => {
    const [toggled, setToggled] = useState<boolean>(false)

    const onToggleMenu = () => {
        setToggled(prev => !prev)
    }

    return (
        <header className={cls.Header}>
            <Logo />
            <div className={cls.Header_buttons}>
                <AddProduct />
                <Profile />
            </div>
            <Menu onToggleMenu={onToggleMenu} />
            {toggled && (
                <ul className={cls.ToggledMenu}>
                    <li><Link to={RoutePath.profile}>
                        <span>Профиль</span>
                    </Link></li>
                    <li><Link to={RoutePath.favorites}>
                        <span>Понравившиеся</span>
                    </Link></li>
                    <li><Link to={RoutePath.my_products}>
                        <span>Мои товары</span>
                    </Link></li>
                </ul>
            )}
        </header>
    )
}
