import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
    fetchProfileData,
    getProfileForm,
    getProfileReadOnly,
    profileActions,
    updateProfileData
} from '@entities/Profile'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@shared/ui/Button'
import cls from './ProfilePageHeader.module.scss'

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
        const formData = new FormData();

        if (data?.username !== undefined) formData.append('username', data.username);
        if (data?.last_name !== undefined) formData.append('last_name', data.last_name);
        if (data?.email !== undefined) formData.append('email', data.email);
        if (data?.first_name !== undefined) formData.append('first_name', data.first_name);
        if (data?.birth_date !== undefined) formData.append('birth_date', data.birth_date);
        if (selectedFile) formData.append('photo', selectedFile);

        const result = await dispatch(updateProfileData({ formData }));

        if (result.meta.requestStatus === 'fulfilled') {
            toast.success('Данные успешно изменены');
            dispatch(fetchProfileData())
        } else {
            toast.error('Произошла ошибка при обновлении данных профиля');
        }
    }, [dispatch, data, selectedFile]);

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
