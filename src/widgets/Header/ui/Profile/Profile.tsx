import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RoutePath } from '@app/providers/router'
import cls from './Profile.module.scss'
import { fetchProfileData, getProfileIsLoading, getProfilePhoto, getProfileUsername } from '@entities/Profile'
import { Loader } from '@shared/ui/Loader'
import { useEffect } from 'react'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'

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
                    ? <Loader />
                    : <img src={avatar} alt="avatar" className={cls.Avatar} />
                }
            </Link>
        </div>
    )
}
