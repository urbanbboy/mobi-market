import { useCallback, useState } from "react"
import { AddProductModal, getAddingProductInfo } from "@features/AddProduct"
import { Button, ButtonTheme } from "@shared/ui/Button"
import { useSelector } from "react-redux"

export const AddProduct = () => {
    const [open, setOpen] = useState<boolean>(false)
    const {
        name,
        price,
        short_description,
        full_description,
        isLoading,
        error
    } = useSelector(getAddingProductInfo)

    const onOpenModal = useCallback(() => {
        setOpen(true)
    }, [])

    const onCloseModal = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <>
            <Button
                onClick={onOpenModal}
                theme={ButtonTheme.CONTAINED}
            >
                Подать объявление
            </Button>
            <AddProductModal
                isEdit={false}
                open={open}
                onClose={onCloseModal}
                name={name}
                price={price}
                short_description={short_description}
                full_description={full_description}
                isLoading={isLoading}
                error={error}
            />
        </>
    )
}
