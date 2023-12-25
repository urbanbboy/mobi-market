import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { 
    ProfileCard, 
    fetchProfileData, 
    getProfileError, 
    getProfileForm, 
    getProfileIsLoading, 
    getProfileReadOnly, 
    profileActions 
} from "@entities/Profile"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader"
import cls from './Profile.module.scss'

export const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const profileError = useSelector(getProfileError)
    const readOnly = useSelector(getProfileReadOnly)
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)

    useEffect(() => {
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
            <ProfilePageHeader selectedFile={selectedFile} />
            <ProfileCard
                isLoading={isLoading}
                profileError={profileError}
                data={formData}
                readOnly={readOnly}
                onChangeFirstName={onChangeFirstName}
                onChangeLastName={onChangeLastName}
                onChangeUsername={onChangeUsername}
                onChangeBirthDate={onChangeBirthDate}
                onChangeEmail={onChangeEmail}
                setSelectedFile={setSelectedFile}
            />            
        </div>
    )
}