import { Button, ButtonTheme } from "@shared/ui/Button"
import { useRef } from "react";

export const AddProductImage = () => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        // if (setSelectedFile) {
        //     setSelectedFile(file)
        // }
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
