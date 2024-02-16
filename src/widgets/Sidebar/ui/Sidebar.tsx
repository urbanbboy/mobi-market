import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loginActions } from '@features/LoginUser/model/slice/loginSlice'
import { userActions } from '@entities/User'
import { fetchProfileData, getProfileFirstName, getProfilePhoto, getProfileUsername } from '@entities/Profile'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Modal } from '@shared/ui/Modal'
import { Button, ButtonTheme } from '@shared/ui/Button'
import cls from './Sidebar.module.scss'
import { RoutePath } from '@shared/config'

export const Sidebar = () => {
    const dispatch = useAppDispatch()
    const photo = useSelector(getProfilePhoto)
    const firstName = useSelector(getProfileFirstName)
    const username = useSelector(getProfileUsername)
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    const onOpenModal = useCallback(() => {
        setOpen(true)
    }, [])

    const onCloseModal = useCallback(() => {
        setOpen(false)
    }, [])

    const onClickLogout = useCallback(() => {
        dispatch(userActions.logout())
        dispatch(loginActions.logout())
    }, [dispatch])

    return (
        <div className={cls.Sidebar}>
            <div className={cls.Profile}>
                <Link to={RoutePath.profile} className={cls.Profile_wrapper}>
                    <img src={photo} className={cls.Profile_img}/>
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
                <Button theme={ButtonTheme.ACTION} onClick={onOpenModal}>
                    <div className={cls.Links_item_text}>
                        <img src="/logout.svg" alt="logout" />
                        Выйти
                    </div>
                    <img src='/right_arrow.svg' alt="" />
                </Button>
            </div>
            <Modal
                showCloseIcon={false}
                onClose={onCloseModal}
                isOpen={open}
            >
                <div className={cls.Modal}>
                    <img src={'/modal_logout.svg'} alt="logout" />
                    <div className={cls.Modal_title}>Вы действительно хотите выйти с акккаунта?</div>
                    <div className={cls.Modal_buttons}>
                        <Button 
                            theme={ButtonTheme.CONTAINED} 
                            fullWidth
                            onClick={onClickLogout}
                        >
                            Выйти
                        </Button>
                        <Button 
                            theme={ButtonTheme.OUTLINED} 
                            fullWidth 
                            onClick={onCloseModal}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
