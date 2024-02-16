import { Modal } from '@shared/ui/Modal';
import { Button, ButtonTheme } from "@shared/ui/Button"
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ProductDeleteModal.module.scss'
import { deleteProductById } from '../../model/services/deleteProductById';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { fetchFavoriteProductsList } from '@pages/FavoriteProductsPage/model/services/fetchFavoriteProductsList';
import { fetchProductList } from '@pages/ProductsPage/model/services/fetchProductsList';

interface ProductDeleteModalProps {
    open: boolean;
    productId: number;
    onCloseModal: () => void;
    currentPage: number;
    fetchUpdatedData: typeof fetchFavoriteProductsList | typeof fetchProductList;
}

export const ProductDeleteModal = (props: ProductDeleteModalProps) => {
    const { onCloseModal, open, productId, fetchUpdatedData, currentPage } = props
    const dispatch = useAppDispatch()

    const handleClickDelete = useCallback(async () => {
        const result = await dispatch(deleteProductById(productId))
        if (result.meta.requestStatus === 'fulfilled') {
            toast.success('Товар удален')
        }
        dispatch(fetchUpdatedData(currentPage))
    }, [dispatch, productId, fetchUpdatedData, currentPage])

    return (
        <Modal
            showCloseIcon={false}
            onClose={onCloseModal}
            isOpen={open}
        >
            <div className={cls.Modal}>
                <img
                    src={'/trash.svg'}
                    alt="delete"
                />
                <div className={cls.Modal_title}>
                    Вы действительно хотите удалить данный товар?
                </div>
                <div className={cls.Modal_buttons}>
                    <Button
                        theme={ButtonTheme.CONTAINED}
                        fullWidth
                        onClick={handleClickDelete}
                    >
                        Удалить
                    </Button>
                    <Button
                        theme={ButtonTheme.OUTLINED}
                        fullWidth
                        onClick={onCloseModal}
                    >
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
