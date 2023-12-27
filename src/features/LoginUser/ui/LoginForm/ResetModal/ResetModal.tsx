import { Modal } from "@shared/ui/Modal"
import { ResetForm } from "./ResetForm/ResetForm";

interface ResetModalProps {
    open: boolean;
    onClose: () => void;
}

export const ResetModal = (props: ResetModalProps) => {
    const { open, onClose } = props
    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            showCloseIcon={false}
        >
            <ResetForm />
        </Modal>
    )
}
