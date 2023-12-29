import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RoutePath } from '@app/providers/router'
import { getProfileForm } from '@entities/Profile'
import cls from './Profile.module.scss'

export const Profile = () => {
    const data = useSelector(getProfileForm)

    return (
        <div className={cls.Profile}>
            <div>{data?.username}</div>
            <Link to={RoutePath.profile}>
                <img src={data?.photo} alt="avatar" className={cls.Avatar} />
            </Link>
        </div>
    )
}
