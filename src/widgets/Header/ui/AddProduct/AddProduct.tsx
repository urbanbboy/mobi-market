import { Button, ButtonTheme } from "@shared/ui/Button"
import { CreateProductModal } from "@shared/ui/CreateProductModal"
import { useCallback, useState } from "react"

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
            <CreateProductModal open={open} onClose={onCloseModal} />
        </>
    )
}
