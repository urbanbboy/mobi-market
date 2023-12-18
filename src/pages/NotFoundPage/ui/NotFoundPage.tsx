import cls from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
    return (
        <div className={cls.NotFoundPage}>
            <div className={cls.NotFoundPage_content}>
                <h1>404</h1>
                <div>Страница не найдена</div>
            </div>
        </div>
    )
}
