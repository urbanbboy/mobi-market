import { Link } from 'react-router-dom'
import cls from './ProfilePageHeader.module.scss'
import { Button, ButtonTheme } from '@shared/ui/Button'
import { useSelector } from 'react-redux'
import { getProfileReadOnly, profileActions, updateProfileData } from '@entities/Profile'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback } from 'react'
import { toast } from 'react-toastify'

export const ProfilePageHeader = () => {
    const readOnly = useSelector(getProfileReadOnly)
    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadOnly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(async () => {
        const result = await dispatch(updateProfileData())
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success('Данные успешно изменены')
        } else {
            toast.error('Произошла ошибка при обновлении данных профиля')
        }
    }, [dispatch])

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
                    <Button onClick={onEdit} theme={ButtonTheme.ACTION}>Изм.</Button>
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
