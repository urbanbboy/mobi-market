import { Modal } from "@shared/ui/Modal"
import { Carousel } from "@shared/ui/ImageCarousel";
import { Button, ButtonTheme } from "@shared/ui/Button";
import { Product } from "../../model/types/Product";
import cls from './ProductEditModal.module.scss'
import { useCallback } from "react";

interface ProductEditModalProps {
    product: Product;
    onCloseModal: () => void;
    handleDelete: () => void;
    setOpenUpdateProductModal: (value: boolean) => void;
    open: boolean;
}

export const ProductEditModal = (props: ProductEditModalProps) => {
    const { 
        onCloseModal, 
        open, 
        product,
        handleDelete, 
        setOpenUpdateProductModal
    } = props

    const handleEdit = useCallback(() => {
        setOpenUpdateProductModal(true)
        onCloseModal()
    }, [setOpenUpdateProductModal, onCloseModal])

    return (
        <Modal
            showCloseIcon={true}
            onClose={onCloseModal}
            isOpen={open}
        >
            <div className={cls.ProductCard}>
                <div className={cls.ProductCard_images}>
                    {product?.images.length === 0
                        ? <div className={cls.Images_absent}>фотографии отсутствуют</div>
                        : <Carousel data={product.images} />
                    }
                </div>
                <div className={cls.ProductCard_info}>
                    <div className={cls.ProductCard_item}>{product.price}</div>
                    <div className={cls.ProductCard_item}>{product.name}</div>
                    <div className={cls.ProductCard_item}>{product.short_description}</div>
                    <div className={cls.ProductCard_item}>{product.full_description}</div>
                </div>
                <div className={cls.ProductCard_buttons}>
                    <Button 
                        onClick={handleEdit}
                        theme={ButtonTheme.CONTAINED}
                    >
                        Редактировать
                    </Button>
                    <Button 
                        onClick={handleDelete} 
                        theme={ButtonTheme.OUTLINED}
                    >
                        Удалить
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
