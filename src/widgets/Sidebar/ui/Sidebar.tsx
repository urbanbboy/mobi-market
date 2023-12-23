import { Link } from 'react-router-dom'
import { RoutePath } from '@app/providers/router'
import { Button, ButtonTheme } from '@shared/ui/Button'
import { useSelector } from 'react-redux'
import { getFirstName, getUsername, userActions } from '@entities/User'
import cls from './Sidebar.module.scss'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'

export const Sidebar = () => {
    const dispatch = useAppDispatch()
    const username = useSelector(getUsername)
    const firstName = useSelector(getFirstName)

    const onClickLogout = () => {
        dispatch(userActions.logout())
    }

    return (
        <div className={cls.Sidebar}>
            <div className={cls.Profile}>
                <Link to={RoutePath.profile} className={cls.Profile_wrapper}>
                    <div className={cls.Profile_img}></div>
                    <div className={cls.Profile_info}>
                        <span className={cls.Profile_info_name}>{firstName}</span>
                        <span className={cls.Profile_info_username}>{username}</span>
                    </div>
                </Link>
            </div>
            <div className={cls.Links}>
                <Link
                    className={cls.Links_item}
                    to={RoutePath.favorites}
                >
                    <div className={cls.Links_item_text}>
                        <img src="/favorite.svg" alt="favorites" />
                        Понравившиеся
                    </div>
                    <img src='/right_arrow.svg' alt="" />
                </Link>
                <Link
                    className={cls.Links_item}
                    to={RoutePath.my_products}
                >
                    <div className={cls.Links_item_text}>
                        <img src="/my_products.svg" alt="my_products" />
                        Мои товары
                    </div>
                    <img src='/right_arrow.svg' alt="" />
                </Link>
                <Button theme={ButtonTheme.ACTION} onClick={onClickLogout}>
                    <div className={cls.Links_item_text}>
                        <img src="/logout.svg" alt="logout" />
                        Выйти
                    </div>
                    <img src='/right_arrow.svg' alt="" />
                </Button>
            </div>
        </div>
    )
}
