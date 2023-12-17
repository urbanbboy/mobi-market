import { AdvertiseButton } from "./AdvertiseButton"
import { Logo } from "./Logo"
import { Navbar } from "./Navbar"
import { Profile } from "./Profile"
import cls from './Header.module.scss'

export const Header = () => {
    return (
        <header className={cls.Header}>
            <Logo />
            <Navbar />
            <div className={cls.Header_buttons}>
                <AdvertiseButton />
                <Profile />
            </div>
        </header>
    )
}
