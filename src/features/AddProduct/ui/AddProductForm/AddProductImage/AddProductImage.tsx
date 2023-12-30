import { Button, ButtonTheme } from "@shared/ui/Button"
import { useRef } from "react";

export const AddProductImage = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onChangeHandler = () => {
        // const file = e.target.files?.[0];
        // if (setSelectedFile) {
        //     setSelectedFile(file)
        // }
        console.log('it should be a file, but Im late')
    };

    return (
        <div>
            {/* <img className={cls.Image} src={imageUrl} alt="Avatar" /> */}
            <input
                type="file"
                ref={fileInputRef}
                // style={{ display: 'none' }}
                hidden
                onChange={onChangeHandler}
            />
            <Button
                theme={ButtonTheme.CLEANED}
                onClick={handleButtonClick}
            >
                Добавить фото
            </Button>
        </div>
    )
}
