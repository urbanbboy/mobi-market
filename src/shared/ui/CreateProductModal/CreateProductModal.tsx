import React from "react";
import Modal from "react-responsive-modal"

interface CreateProductModalProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

export const CreateProductModal = (props: CreateProductModalProps) => {
    const { onClose, open, children } = props



    return (
        <Modal

        >
            {children}
        </Modal>
    )
}
