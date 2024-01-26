import Modal from "react-responsive-modal"
import { AddProductForm } from "../AddProductForm/AddProductForm";

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddProductModal = (props: AddProductModalProps) => {
    const { open, onClose } = props

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
            <AddProductForm onClose={onClose} />
        </Modal>
    )
}
