
import cls from './Logo.module.scss'

export const Logo = () => {
    return (
        <div className={cls.Logo}> 
            <img src="/logo.svg" className={cls.Logo_img}/>
            <span className={cls.Logo_text}>Mobi Market</span>
        </div>
    )
}
