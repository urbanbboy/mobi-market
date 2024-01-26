import { useRef } from 'react';
import cls from './Avatar.module.scss'
import { Button, ButtonTheme } from '@shared/ui/Button';

interface AvatarProps {
    photo?: File | string;
    readOnly?: boolean;
    setSelectedFile?: (value?: File | undefined) => void;
}

export const Avatar = (props: AvatarProps) => {
    const {
        photo,
        readOnly,
        setSelectedFile
    } = props

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (setSelectedFile) {
            setSelectedFile(file)
        }
    };

    const imageUrl = typeof photo === 'string' ? photo : photo?.name;

    return (
        <div className={cls.Avatar}>
            <img className={cls.Image} src={imageUrl} alt="Avatar" />
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={onChangeHandler}
                readOnly={readOnly}
            />
            {!readOnly && (
                <Button
                    theme={ButtonTheme.CLEANED}
                    onClick={handleButtonClick}
                >
                    Выбрать фотографию
                </Button>
            )}

        </div>
    );
};