import { Loader } from "@shared/ui/Loader"
import cls from './PageLoader.module.scss'

export const PageLoader = () => {
    return (
        <div className={cls.PageLoader}>
            <Loader />
        </div>
    )
}
