import { useSelector } from 'react-redux'
import cls from './Profile.module.scss'
import { getUsername } from '@entities/User'
import { Link } from 'react-router-dom'
import { RoutePath } from '@app/providers/router'

export const Profile = () => {
    const username = useSelector(getUsername)

    return (
        <div className={cls.Profile}>
            <div>{username}</div>
            <Link to={RoutePath.profile}>
                <div className={cls.Profile_img}></div>
            </Link>
        </div>
    )
}
