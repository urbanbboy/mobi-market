import { Logo } from "./Logo"
import { Profile } from "./Profile"
import cls from './Header.module.scss'
import { AddProduct } from "./AddProduct"

export const Header = () => {
    return (
        <header className={cls.Header}>
            <Logo />
            <div className={cls.Header_buttons}>
                <AddProduct />
                <Profile />
            </div>
        </header>
    )
}
