import { useState } from "react"
import { FirstResetForm } from "../FirstResetForm/FirstResetForm"
import { SecondResetForm } from "../SecondResetForm/SecondResetForm"

export const ResetForm = () => {
    const [step, setStep] = useState<number>(1)
    //Делаем также как и с регистрацией
    //таски на завтра: сброс пароля, закончить регистрацию, страница - понравившиеся товары

    const checkHasPhoneRegistered = () => {
        setStep(2)
    }

    return (
        <div>
            {step === 1 && <FirstResetForm onSuccess={checkHasPhoneRegistered}/>}
            {step === 2 && <SecondResetForm/>}
        </div>
    )
}
