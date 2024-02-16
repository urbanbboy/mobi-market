import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
    fetchProfileData, 
    getProfileIsLoading, 
    getProfilePhoto, 
    getProfileUsername 
} from '@entities/Profile'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AuthLoader } from '@shared/ui/AuthLoader/AuthLoader'
import cls from './Profile.module.scss'
import { RoutePath } from '@shared/config'

export const Profile = () => {
    const dispatch = useAppDispatch()
    const avatar = useSelector(getProfilePhoto)
    const username = useSelector(getProfileUsername)
    const isLoading = useSelector(getProfileIsLoading)

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    return (
        <div className={cls.Profile}>
            <div>{username}</div>
            <Link to={RoutePath.profile}>
                {isLoading
                    ? <AuthLoader />
                    : <img src={avatar} alt="avatar" className={cls.Avatar} />
                }
            </Link>
        </div>
    )
}
