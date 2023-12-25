import { ReactNode } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'

interface ReactModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    showCloseIcon?: boolean;
}

export const ReactModal = (props: ReactModalProps) => {
    const { isOpen, onClose, children, showCloseIcon } = props

    const modalStyles = {
        modal: {
            fontFamily: 'Inter', 
        },
    };

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
                center
                showCloseIcon={showCloseIcon}
                styles={modalStyles}
            >
                {children}
            </Modal>
        </>
    );
};