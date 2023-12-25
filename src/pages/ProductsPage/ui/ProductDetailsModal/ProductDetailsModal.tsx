import { ProductDetails } from "@entities/Product"
import { Modal } from "@shared/ui/Modal"
import { useState } from "react"

export const ProductDetailsModal = () => {
    const [open, setOpen] = useState<boolean>(true)

    const onCloseModal = () => {
        setOpen(false)
    }
    
    return (
        <Modal
            showCloseIcon
            isOpen={open}
            onClose={onCloseModal}
        >
            <ProductDetails/>
        </Modal>
    )
}
