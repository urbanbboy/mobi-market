import { Carousel } from "@shared/ui/ImageCarousel";
import { Product } from "../../model/types/Product";
import cls from './ProductListItem.module.scss'
import { Card } from "@shared/ui/Card";
import { useCallback, useState } from "react";
import { ProductDetailsModal } from "../ProductDetailsModal/ProductDetailsModal";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { favoriteProductsActions } from "@pages/FavoriteProductsPage";
import { likeProductById, unlikeProductById } from "@entities/Product";
import { toast } from "react-toastify";
import { fetchProductList } from "@pages/ProductsPage/model/services/fetchProductsList";
import { fetchFavoriteProductsList } from "@pages/FavoriteProductsPage/model/services/fetchFavoriteProductsList";

interface ProductListItemProps {
    product: Product;
    currentPage: number;
    fetchUpdatedData: typeof fetchFavoriteProductsList | typeof fetchProductList
}

export const ProductListItem = (props: ProductListItemProps) => {
    const { product, currentPage, fetchUpdatedData } = props
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const onOpenModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        setOpen(true)
    }

    const onCloseModal = () => {
        setOpen(false)
    }

    const handleClickLike = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        if (product.liked_by_current_user) {
            const result = await dispatch(unlikeProductById(product.id))
            if (result.meta.requestStatus === 'fulfilled') {
                toast.info('Товар удален из списка понравившихся')
            }
            dispatch(favoriteProductsActions.unlikeProduct(product.id))

        } else {
            const result = await dispatch(likeProductById(product.id))
            if (result.meta.requestStatus === 'fulfilled') {
                toast.success('Товар добавлен в списоок понравившихся')
            }
            dispatch(favoriteProductsActions.likeProduct(product.id))
        }

        dispatch(fetchUpdatedData(currentPage))

    }, [product, dispatch, currentPage, fetchUpdatedData])

    return (
        <>
            <Card onClick={(e) => onOpenModal(e)}>
                <div className={cls.Images}>
                    {product?.images.length === 0
                        ? <div className={cls.Images_absent}>фотографии отсутствуют</div>
                        : <Carousel isCard data={product.images} />
                    }
                </div>
                <div className={cls.InfoWrapper}>
                    <div className={cls.Name}>{product.name}</div>
                    <div className={cls.Price}>{product.price}</div>
                    <div className={cls.Likes}>
                        <img
                            onClick={(e) => handleClickLike(e)}
                            src={product.liked_by_current_user ? '/like.svg' : '/no_like.svg'}
                            alt="likes"
                        />
                        {product.like_count}
                    </div>
                </div>
            </Card>
            <ProductDetailsModal open={open} onCloseModal={onCloseModal} productId={product.id} />
        </>

    )
}
