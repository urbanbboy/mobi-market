import { RegisterForm } from '@features/RegisterUser'
import { AuthLayout } from '@widgets/layouts'
import cls from './RegisterPage.module.scss'
import { Link } from 'react-router-dom'
import { RoutePath } from '@app/providers/router'

export const RegisterPage = () => {
    return (
        <div className={cls.RegisterPage}>
            <AuthLayout>
                <div className={cls.RegisterPage_form}>
                    <div className={cls.RegisterPage_goBack}>
                        <Link to={RoutePath.login}>
                            <img src="/public/left_arrow.svg" alt="left-arrow" />
                            <span>Назад</span>
                        </Link>
                    </div>
                    <div className={cls.RegisterPage_title}>Регистрация</div>
                    <RegisterForm />
                </div>
            </AuthLayout>
        </div>
    )
}
