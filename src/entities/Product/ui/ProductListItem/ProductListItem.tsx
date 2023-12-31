import { Carousel } from "@shared/ui/ImageCarousel";
import { Product } from "../../model/types/Product";
import { Card } from "@shared/ui/Card";
import { useCallback, useState } from "react";
import { ProductDetailsModal } from "../ProductDetailsModal/ProductDetailsModal";
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch";
import { favoriteProductsActions } from "@pages/FavoriteProductsPage";
import { likeProductById, unlikeProductById } from "@entities/Product";
import { toast } from "react-toastify";
import { fetchProductList } from "@pages/ProductsPage/model/services/fetchProductsList";
import { fetchFavoriteProductsList } from "@pages/FavoriteProductsPage/model/services/fetchFavoriteProductsList";
import { Modal } from "@shared/ui/Modal";
import { Button, ButtonTheme } from "@shared/ui/Button";
import cls from './ProductListItem.module.scss'

interface ProductListItemProps {
    product: Product;
    currentPage: number;
    fetchUpdatedData: typeof fetchFavoriteProductsList | typeof fetchProductList
}

export const ProductListItem = (props: ProductListItemProps) => {
    const { product, currentPage, fetchUpdatedData } = props
    const [open, setOpen] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const onOpenModal = useCallback(() => {
        setOpen(true)
    }, [])

    const onCloseModal = useCallback(() => {
        setOpen(false)
    }, [])

    const openProductDeleteModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setOpenDeleteModal(true)
    }

    const onCloseProductDeleteModal = useCallback(() => {
        setOpenDeleteModal(false)
    }, [])

    const handleClickLike = useCallback(async () => {
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
            <Card onClick={onOpenModal}>
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
                            onClick={openProductDeleteModal}
                            src={product.liked_by_current_user ? '/like.svg' : '/no_like.svg'}
                            alt="likes"
                        />
                        {product.like_count}
                    </div>
                </div>
            </Card>
            <ProductDetailsModal open={open} onCloseModal={onCloseModal} productId={product.id} />
            <Modal
                showCloseIcon={false}
                onClose={onCloseModal}
                isOpen={openDeleteModal}
            >
                <div className={cls.Modal}>
                    <img 
                        src={product.liked_by_current_user ? '/trash.svg' : '/heart.svg'} 
                        alt="logout" 
                    />
                    <div className={cls.Modal_title}>
                        {product.liked_by_current_user 
                            ? 'Вы действительно хотите удалить данный товар?' 
                            : 'Вы действительно хотите добавить данный товар?'
                        }
                    </div>
                    <div className={cls.Modal_buttons}>
                        <Button
                            theme={ButtonTheme.CONTAINED}
                            fullWidth
                            onClick={handleClickLike}
                        >
                            {product.liked_by_current_user
                                ? "Удалить" 
                                : "Добавить"
                            }
                        </Button>
                        <Button
                            theme={ButtonTheme.OUTLINED}
                            fullWidth
                            onClick={onCloseProductDeleteModal}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>
            </Modal>
        </>

    )
}
