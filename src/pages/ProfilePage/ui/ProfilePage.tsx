import { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { 
    ProfileCard, 
    fetchProfileData, 
    getProfileError, 
    getProfileForm, 
    getProfileIsFinished, 
    getProfileIsLoading, 
    getProfileReadOnly, 
    profileActions 
} from "@entities/Profile"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader"
import cls from './Profile.module.scss'

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const profileError = useSelector(getProfileError)
    const isRegisterFinished = useSelector(getProfileIsFinished)
    const readOnly = useSelector(getProfileReadOnly)

    useEffect(() => {
        console.log('Fetching profile data...');
        dispatch(fetchProfileData())
    }, [dispatch])

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ first_name: value || '' }))
    }, [dispatch])

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ last_name: value || '' }))
    }, [dispatch])

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ username: value || '' }))
    }, [dispatch])

    const onChangeBirthDate = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ birth_date: value || '' }))
    }, [dispatch])

    const onChangeEmail= useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ email: value || '' }))
    }, [dispatch])

    return (
        <div className={cls.ProfilePage}>
            <ProfilePageHeader />
            <ProfileCard
                isLoading={isLoading}
                profileError={profileError}
                data={formData}
                readOnly={readOnly}
                isFinished={isRegisterFinished}
                onChangeFirstName={onChangeFirstName}
                onChangeLastName={onChangeLastName}
                onChangeUsername={onChangeUsername}
                onChangeBirthDate={onChangeBirthDate}
                onChangeEmail={onChangeEmail}
            />            
        </div>
    )
}

export default ProfilePage