import { ReactNode } from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css'

interface ReactModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export const ReactModal = (props: ReactModalProps) => {
    const { isOpen, onClose, children } = props

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
                showCloseIcon={false}
                styles={modalStyles}
            >
                {children}
            </Modal>
        </>
    );
};