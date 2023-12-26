import { Modal } from "@shared/ui/Modal"
import { ProductDetails } from "../ProductDetails/ProductDetails";

interface ProductDetailsModalProps {
    productId: number;
    open: boolean;
    onCloseModal: () => void
}

export const ProductDetailsModal = (props: ProductDetailsModalProps) => {
    const { open, onCloseModal, productId } = props

    return (
        <Modal
            showCloseIcon
            isOpen={open}
            onClose={onCloseModal}
        >
            <ProductDetails productId={productId} />
        </Modal>
    )
}
