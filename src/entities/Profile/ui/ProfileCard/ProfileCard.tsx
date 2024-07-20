import { Input } from '@shared/ui/Input'
import { Profile } from '@entities/Profile'
import { Loader } from '@shared/ui/Loader';
import cls from './ProfileCard.module.scss'
import { Button, ButtonTheme } from '@shared/ui/Button';
import { DatePickerInput } from '@shared/ui/DatePickerInput';
import { Avatar } from '../Avatar/Avatar';

interface ProfileCardProps {
    data?: Profile;
    isLoading?: boolean;
    profileError?: string | undefined;
    isFinished?: boolean;
    readOnly?: boolean,
    onChangeFirstName?: (value?: string) => void,
    onChangeLastName?: (value?: string) => void,
    onChangeUsername?: (value?: string) => void,
    onChangeBirthDate?: (value?: string) => void,
    onChangeEmail?: (value?: string) => void,
    setSelectedFile?: (value?: File | undefined) => void,
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        data,
        isLoading,
        profileError,
        readOnly,
        onChangeFirstName,
        onChangeLastName,
        onChangeUsername,
        onChangeBirthDate,
        onChangeEmail,
        setSelectedFile
    } = props    
    
    if (isLoading) {
        return (
            <div className={cls.Profile}>
                <div className={cls.Loading}>
                    <Loader />
                </div>
            </div>
        )
    }

    if (profileError) {
        return (
            <div className={cls.Profile}>
                <div className={cls.Error}>
                    <h3>Произошла ошибка при загрузке профиля</h3>
                    <p>Попробуйте перезагрузить страницу</p>
                </div>
            </div>
        )
    }

    return (
        <div className={cls.Profile}>
            <div className={cls.Data}>
                <div className={cls.UserInfo_avatar}>
                    <Avatar 
                        photo={data?.photo} 
                        readOnly={readOnly}
                        setSelectedFile={setSelectedFile}
                    />
                </div>
                <div className={cls.UserInfo}>
                    <Input
                        value={data?.first_name}
                        onChange={onChangeFirstName}
                        placeholder={'Имя'}
                        fullWidth
                        readOnly={readOnly}
                    />
                    <Input
                        value={data?.last_name}
                        onChange={onChangeLastName}
                        placeholder={'Фамилия'}
                        fullWidth
                        readOnly={readOnly}
                    />
                    <Input
                        value={data?.username}
                        placeholder={'Имя пользователя'}
                        onChange={onChangeUsername}
                        fullWidth
                        readOnly={readOnly}
                    />
                    <DatePickerInput
                        value={data?.birth_date}
                        placeholder={'ггг-мм-дд'}
                        dateFormat={'yyyy-MM-dd'}
                        onChange={onChangeBirthDate}
                        readOnly={readOnly}
                    />
                </div>
                <div className={cls.ContactInfo}>
                    <div className={cls.ContactInfo_phone}>
                        <Button
                            theme={ButtonTheme.ACTION}
                        >
                            Добавить номер
                        </Button>
                        <Input
                            value={data?.phone}
                            placeholder={'0(000) 000 000'}
                            readOnly={readOnly}
                            fullWidth
                        />
                    </div>
                    <Input
                        value={data?.email}
                        onChange={onChangeEmail}
                        placeholder={'почта'}
                        type='email'
                        fullWidth
                        readOnly={readOnly}
                        isLast
                    />
                </div>

            </div>
        </div>
    )
}
