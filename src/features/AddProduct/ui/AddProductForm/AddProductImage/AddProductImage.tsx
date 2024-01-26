import { useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { Button, ButtonTheme } from '@shared/ui/Button'
import cls from './AddProductImage.module.scss'

interface AddProductImageProps {
    getImages: (images: never[]) => void;
}

export const AddProductImage = (props: AddProductImageProps) => {
    const { getImages } = props
    const [images, setImages] = useState<never[]>([])
    const maxNumber = 15

    const onChange = (imageList: ImageListType) => {
        console.log(imageList);
        setImages(imageList as never[]);
        getImages(imageList as never[]);
    }

    // useEffect(() => {
    // }, [images, getImages]);

    return (
        <>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
            >
                {({
                    imageList,
                    onImageUpload,
                    dragProps,
                    onImageRemove,
                }) => (
                    <div className={cls.upload_image_wrapper}>
                        <Button
                            theme={ButtonTheme.CLEANED}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            <div className={cls.upload_image_button}>
                                <img src="/add_product.svg" alt="add" />
                                <span>Добавить фото</span>
                            </div>
                        </Button>

                        {imageList.map((image, index) => (
                            <div key={index} className={cls.container}>
                                <img
                                    src={image.dataURL}
                                    alt="image"
                                    width="100"
                                    className={cls.image_item}
                                />
                                <div className={cls.image_item__btn_wrapper}>
                                    <img
                                        className={cls.image_item_remove}
                                        src="/remove_product.svg"
                                        alt="remove"
                                        onClick={() => onImageRemove(index)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </>
    )
}
