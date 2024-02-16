import Modal from "react-responsive-modal"
import { AddProductForm } from "../AddProductForm/AddProductForm";
import { Images } from "@entities/Product";

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
    isEdit: boolean;
    name: string;
    price: string;
    short_description: string;
    full_description: string;
    productId?: number;
    isLoading?: boolean;
    error?: string;
    productImages?: Images[];
}

export const AddProductModal = (props: AddProductModalProps) => {
    const {
        open,
        onClose,
        isEdit,
        productId,
        name,
        price,
        short_description,
        full_description,
        productImages,
        isLoading,
        error
    } = props

    const modalStyles = {
        modal: {
            fontFamily: 'Inter',
            width: '564px'
        }
    }

    return (
        <Modal
            onClose={onClose}
            open={open}
            center
            styles={modalStyles}
        >
            <AddProductForm
                isEdit={isEdit}
                onClose={onClose}
                name={name}
                price={price}
                short_description={short_description}
                full_description={full_description}
                isLoading={isLoading}
                error={error}
                productImages={productImages}
                productId={productId}
            />
        </Modal>
    )
}
