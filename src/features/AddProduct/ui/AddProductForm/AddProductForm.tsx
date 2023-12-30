import { Button, ButtonTheme } from "@shared/ui/Button"
import { Input } from "@shared/ui/Input"
import cls from './AddProductForm.module.scss'
import { AddProductImage } from "./AddProductImage/AddProductImage"

export const AddProductForm = () => {
    const inputStyles = {
        background: '#F7F6F9',
        borderRadius: '12px',
        padding: "10px 16px",
        marginBottom: '8px'
    }

    const onClickSubmit = () => {
        console.log('submitted')
    }

    return (
        <div className={cls.Form}>
            <form onSubmit={onClickSubmit}>
                <AddProductImage /> 
                <Input
                    // value={''}
                    // onChange={}
                    placeholder={'Цена'}
                    type='text'
                    fullWidth
                    isLast
                    style={inputStyles}
                />
                <Input
                    // value={''}
                    // onChange={}
                    placeholder={'Название'}
                    type='text'
                    fullWidth
                    isLast
                    style={inputStyles}
                />
                <Input
                    // value={''}
                    // onChange={}
                    placeholder={'Краткое описание'}
                    type='text'
                    fullWidth
                    isLast
                    style={inputStyles}
                />
                <Input
                    // value={''}
                    // onChange={}
                    placeholder={'Полное описание'}
                    type='text'
                    fullWidth
                    isLast
                    style={inputStyles}
                />
                <div className={cls.submitButton}>
                    <Button
                        type="submit"
                        theme={ButtonTheme.CONTAINED}
                        fullWidth
                    >
                        Добавить
                    </Button>
                </div>
            </form>
        </div>
    )
}
