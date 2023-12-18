
import cls from './ErrorPage.module.scss'

export const ErrorPage = () => {
    const reloadPage = () => {
        location.reload()
    }

    return (
        <div className={cls.ErrorPage}>
            <p>Произошла непредвиденная ошибка</p>
            <button onClick={reloadPage}>Обновить страницу</button>
        </div>
    )
}