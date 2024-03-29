import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    getProfileFirstName,
    getProfileIsLoading,
    getProfilePhoto,
    getProfileUsername
} from '@entities/Profile'
import { AuthLoader } from '@shared/ui/AuthLoader/AuthLoader'
import cls from './Profile.module.scss'
import { RoutePath } from '@shared/config'

export const Profile = () => {
    const avatar = useSelector(getProfilePhoto)
    const username = useSelector(getProfileUsername)
    const first_name = useSelector(getProfileFirstName)
    const isLoading = useSelector(getProfileIsLoading)

    return (
        <div className={cls.Profile}>
            <div className={cls.ProfileName}>
                <div>{first_name}</div>
                <div>{username}</div>
            </div>
            <Link to={RoutePath.profile}>
                {isLoading
                    ? <AuthLoader />
                    : <img src={avatar} alt="avatar" className={cls.Avatar} />
                }
            </Link>
        </div>
    )
}
