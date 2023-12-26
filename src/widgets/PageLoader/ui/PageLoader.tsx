import { Loader } from "@shared/ui/Loader"
import cls from './PageLoader.module.scss'

interface PageLoaderProps {
    isModal?: boolean;
}

export const PageLoader = (props: PageLoaderProps) => {
    const { isModal } = props
    const loaderClasses = [
        cls.PageLoader,
        isModal ? cls.Modal : ''
    ].join(' ')

    return (
        <div className={loaderClasses}>
            <Loader />
        </div>
    )
}
