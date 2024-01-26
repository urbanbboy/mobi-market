import { Button, ButtonTheme } from "@shared/ui/Button"
import { Input } from "@shared/ui/Input"
import { AddProductImage } from "./AddProductImage/AddProductImage"
import cls from './AddProductForm.module.scss'
import { useSelector } from "react-redux"
import { getAddingProductInfo } from "../../model/selectors/getAddingProductInfo/getAddingProductInfo"
import { useCallback, useState } from "react"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { addProductActions } from "../../model/slice/addProductSlice"
import { addProduct } from "../../model/service/addProduct/addProduct"
import { toast } from "react-toastify"
import { getProductPage } from "@pages/ProductsPage/model/selectors/getProductPage/getProductPage"
import { fetchProductList } from "@pages/ProductsPage/model/services/fetchProductsList"
import { AuthLoader } from "@shared/ui/AuthLoader/AuthLoader"
// import { ImageType } from "react-images-uploading"

interface AddProductFormProps {
    onClose: () => void
}

export const AddProductForm = (props: AddProductFormProps) => {
    const { onClose } = props
    const inputStyles = {
        background: '#F7F6F9',
        borderRadius: '12px',
        padding: "10px 16px",
        marginBottom: '8px'
    }
    const {
        name,
        price,
        short_description,
        full_description,
        isLoading,
        error
    } = useSelector(getAddingProductInfo)
    const { currentPage } = useSelector(getProductPage)
    const [selectedImages, setSelectedImages] = useState<never[]>([])
    const dispatch = useAppDispatch()

    const onChangePrice = useCallback((value: string) => {
        dispatch(addProductActions.setPrice(value))
    }, [dispatch])

    const onChangeName = useCallback((value: string) => {
        dispatch(addProductActions.setName(value))
    }, [dispatch])

    const onChangeShortDescription = useCallback((value: string) => {
        dispatch(addProductActions.setShortDescription(value))
    }, [dispatch])

    const onChangeFullDescription = useCallback((value: string) => {
        dispatch(addProductActions.setFullDescription(value))
    }, [dispatch])

    const getImages = useCallback((photos: never[]) => {
        setSelectedImages(photos);
    }, []);

    const onClickSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = new FormData()

            formData.append('price', price)
            formData.append('name', name)
            formData.append('short_description', short_description)
            formData.append('full_description', full_description)
            selectedImages.forEach((image: { file: string | Blob }) => {
                formData.append('uploaded_images', image.file);
            });

            const result = await dispatch(addProduct({ formData }))

            if (result.meta.requestStatus === 'fulfilled') {
                toast.success('Товар успешно добавлен');
                onClose()
                dispatch(addProductActions.resetValues())
                await dispatch(fetchProductList(currentPage))
            } else {
                toast.error('Ошибка при добавлении нового товара. Попробуйте еще раз');
            }
        } catch (error) {
            console.log(error)
        }

    }, [dispatch, full_description, selectedImages, name, price, short_description, onClose, currentPage])

    return (
        <div className={cls.Form}>
            <form onSubmit={onClickSubmit} noValidate>
                <AddProductImage getImages={getImages} />
                <div className={cls.product_description}>
                    <Input
                        value={price}
                        onChange={onChangePrice}
                        placeholder={'Цена'}
                        type='text'
                        fullWidth
                        isLast
                        style={inputStyles}
                    />
                    <Input
                        value={name}
                        onChange={onChangeName}
                        placeholder={'Название'}
                        type='text'
                        fullWidth
                        isLast
                        style={inputStyles}
                    />
                    <Input
                        value={short_description}
                        onChange={onChangeShortDescription}
                        placeholder={'Краткое описание'}
                        type='text'
                        fullWidth
                        isLast
                        style={inputStyles}
                    />
                    <Input
                        value={full_description}
                        onChange={onChangeFullDescription}
                        placeholder={'Полное описание'}
                        type='text'
                        fullWidth
                        isLast
                        style={inputStyles}
                    />
                    <div className={cls.submit_button}>
                        <Button
                            type="submit"
                            theme={ButtonTheme.CONTAINED}
                            fullWidth
                            disabled={isLoading}
                        >
                            {isLoading ? <AuthLoader /> : 'Добавить'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
