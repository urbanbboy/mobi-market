import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RoutePath } from '@app/providers/router'
import cls from './Profile.module.scss'
import { getProfilePhoto, getProfileUsername } from '@entities/Profile'

export const Profile = () => {
    const avatar = useSelector(getProfilePhoto)
    const username = useSelector(getProfileUsername)

    return (
        <div className={cls.Profile}>
            <div>{username}</div>
            <Link to={RoutePath.profile}>
                <img src={avatar} alt="avatar" className={cls.Avatar} />
            </Link>
        </div>
    )
}
