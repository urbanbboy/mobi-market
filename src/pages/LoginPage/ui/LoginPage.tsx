import { LoginForm } from '@features/LoginUser'
import cls from './LoginPage.module.scss'
import { AuthLayout } from '@widgets/layouts'


export const LoginPage = () => {
    return (
        <div className={cls.LoginPage}>
            <AuthLayout>
                <div className={cls.LoginPage_form}>
                    <LoginForm />
                </div>
            </AuthLayout>
        </div>
    )
}
