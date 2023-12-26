import { Carousel } from "@shared/ui/ImageCarousel";
import { Product } from "../../model/types/Product";
import cls from './ProductListItem.module.scss'
import { Card } from "@shared/ui/Card";
import { useState } from "react";
import { ProductDetailsModal } from "../ProductDetailsModal/ProductDetailsModal";

interface ProductListItemProps {
    product: Product;
}

export const ProductListItem = (props: ProductListItemProps) => {
    const { product } = props
    const [ open, setOpen ] = useState<boolean>(false)

    const onOpenModal = () => {
        setOpen(true)
    }

    const onCloseModal = () => {
        setOpen(false)
    }

    return (
        <>
            <Card onClick={onOpenModal}>
                <div className={cls.Images}>
                    <Carousel isCard data={product.images} />
                </div>
                <div className={cls.InfoWrapper}>
                    <div className={cls.Name}>{product.name}</div>
                    <div className={cls.Price}>{product.price}</div>
                    <div className={cls.Likes}>
                        <img src={'/no_like.svg'} alt="likes" />
                        {product.like_count}
                    </div>
                </div>
            </Card>
            <ProductDetailsModal open={open} onCloseModal={onCloseModal} productId={product.id} />
        </>

    )
}
