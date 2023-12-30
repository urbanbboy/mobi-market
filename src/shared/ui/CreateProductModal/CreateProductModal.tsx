import { AddProductForm } from "@features/AddProduct";
import Modal from "react-responsive-modal"

interface CreateProductModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreateProductModal = (props: CreateProductModalProps) => {
    const { onClose, open } = props

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
            showCloseIcon={false}
            center
            styles={modalStyles}
        >
            <AddProductForm />
        </Modal>
    )
}
