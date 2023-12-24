import { Link } from 'react-router-dom'
import cls from './ProfilePageHeader.module.scss'
import { Button, ButtonTheme } from '@shared/ui/Button'
import { useSelector } from 'react-redux'
import { getProfileForm, getProfileReadOnly, profileActions, updateProfileData } from '@entities/Profile'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

interface ProfilePageHeaderProps {
    selectedFile?: File | string | null;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { selectedFile } = props
    const readOnly = useSelector(getProfileReadOnly)
    const data = useSelector(getProfileForm)
    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadOnly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(async () => {
        const formData = new FormData()
        formData.append('username', data?.username || '')
        formData.append('last_name', data?.last_name || '')
        formData.append('email', data?.email || '')
        formData.append('first_name', data?.first_name || '')
        formData.append('birth_date', data?.birth_date || '')
        formData.append('photo', selectedFile || '')

        const result = await dispatch(updateProfileData({ formData }))
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success('Данные успешно изменены')
            location.reload()
        } else {
            toast.error('Произошла ошибка при обновлении данных профиля')
        }
    }, [dispatch, data?.birth_date, data?.email, data?.first_name, data?.last_name, data?.username, selectedFile])

    return (
        <div className={cls.Header}>
            <div className={cls.goBack}>
                <Link to={'/'}>
                    <img src="/left_arrow.svg" alt="left-arrow" />
                    <span>Назад</span>
                </Link>
            </div>
            <div className={cls.Header_title}>Профиль</div>
            {readOnly
                ? (
                    <Button onClick={onEdit} theme={ButtonTheme.ACTION}>Изменить</Button>
                )
                : (
                    <div className={cls.EditButtons}>
                        <Button onClick={onCancelEdit} theme={ButtonTheme.CONTAINED_RED}>Отменить</Button>
                        <Button onClick={onSave} theme={ButtonTheme.CONTAINED_GREEN}>Готово</Button>
                    </div>
                )
            }

        </div>
    )
}
