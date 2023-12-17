
import cls from './ErrorPage.module.scss'

export const ErrorPage = () => {
    const reloadPage = () => {
        location.reload()
    }

    return (
        <div className={cls.ErrorPage}>
            <h1>404 Not Found</h1>
            <p>Произошла непредвиденная ошибка</p>
            <button onClick={reloadPage}>Обновить страницу</button>
        </div>
    )
}