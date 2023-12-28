import { Carousel } from "@shared/ui/ImageCarousel";
import { Product } from "../../model/types/Product";
import cls from './ProductListItem.module.scss'
import { Card } from "@shared/ui/Card";
import { useState } from "react";
import { ProductDetailsModal } from "../ProductDetailsModal/ProductDetailsModal";
import { useLikeProduct } from "@shared/lib/hooks/useLikeProduct/useLikeProduct";

interface ProductListItemProps {
    product: Product;
}

export const ProductListItem = (props: ProductListItemProps) => {
    const { product } = props
    const [open, setOpen] = useState<boolean>(false)
    const { isLiked, likeProduct, unlikeProduct } = useLikeProduct()

    const onOpenModal = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setOpen(true)
    }

    const onCloseModal = () => {
        setOpen(false)
    }

    const handleClickLike = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (isLiked) {
            unlikeProduct(product.id)
        } else {
            likeProduct(product.id)
        }
    }

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
                        <div onClick={handleClickLike}>
                            <img
                                src={isLiked ? '/like.svg' : '/no_like.svg'}
                                alt="likes"
                            />
                        </div>

                        {product.like_count}
                    </div>
                </div>
            </Card>
            <ProductDetailsModal open={open} onCloseModal={onCloseModal} productId={product.id} />
        </>

    )
}
