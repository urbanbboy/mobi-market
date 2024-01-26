import { useCallback, useState } from "react"
import { AddProductModal } from "@features/AddProduct"
import { Button, ButtonTheme } from "@shared/ui/Button"

export const AddProduct = () => {
    const [open ,setOpen] = useState<boolean>(false)

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
            <AddProductModal open={open} onClose={onCloseModal} />
        </>
    )
}
