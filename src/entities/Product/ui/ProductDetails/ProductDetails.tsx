import {
    getProductDetailsData,
    getProductDetailsError,
    getProductDetailsIsLoading
} from "../../model/selectors/getProductDetailsData/getProductDetailsData"
import { fetchProductById } from "../../model/services/fetchProductById"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Carousel } from "@shared/ui/ImageCarousel"
import { Loader } from "@shared/ui/Loader"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import cls from './ProductDetails.module.scss'

export const ProductDetails = () => {
    const data = useSelector(getProductDetailsData)

    const isLoading = useSelector(getProductDetailsIsLoading)
    const error = useSelector(getProductDetailsError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProductById('1'))
    }, [dispatch])

    let content;

    if (isLoading) {
        content = (
            <Loader />
        )
    } else if (error) {
        content = (
            <div>Товар не найден</div>
        )
    } else {
        content = (
            <>
                <div className={cls.ProductCard}>
                    <div className={cls.ProductCard_images}>
                        <Carousel data={data?.images} />
                    </div>
                    <div className={cls.ProductCard_info}>
                        <div className={cls.ProductCard_price}>{data?.price} сом</div>
                        <div className={cls.ProductCard_phone}>{data?.phone_number}</div>
                        <div className={cls.ProductCard_likes}>
                            <img src="/like.svg" alt="like" />
                            Нравится: {data?.like_count}
                        </div>
                        <div className={cls.ProductCard_name}>{data?.name}</div>
                        <div className={cls.ProductCard_short}>{data?.short_description}</div>
                        <div className={cls.ProductCard_longWrapper}>
                            <div>Детальное описание</div>
                            <div className={cls.ProductCard_long}>{data?.full_description}</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            {content}
        </div>
    )
}
