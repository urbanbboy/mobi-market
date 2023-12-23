import { Input } from '@shared/ui/Input'
import { Profile } from '@entities/Profile'
import { Loader } from '@shared/ui/Loader';
import cls from './ProfileCard.module.scss'
import { Button, ButtonTheme } from '@shared/ui/Button';

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
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        data,
        isLoading,
        profileError,
        isFinished,
        readOnly,
        onChangeFirstName,
        onChangeLastName,
        onChangeUsername,
        onChangeBirthDate,
        onChangeEmail
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
                    <div className={cls.UserInfo_avatar_circle}></div>
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
                    <Input
                        value={data?.birth_date}
                        placeholder={'ггг-мм-дд'}
                        onChange={onChangeBirthDate}
                        fullWidth
                        readOnly={readOnly}
                        isLast
                    />
                </div>
                <div className={cls.ContactInfo}>
                    <div>
                        <Input
                            value={data?.phone}
                            placeholder={'ггг-мм-дд'}
                            fullWidth
                        />
                    </div>
                    <Input
                        value={data?.email}
                        onChange={onChangeEmail}
                        placeholder={'почта'}
                        fullWidth
                        readOnly={readOnly}
                        isLast
                    />
                </div>

                {!isFinished && (
                    <div className={cls.FinishRegister}>
                        <Button theme={ButtonTheme.CONTAINED}>
                            Закончить регистрацию
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
