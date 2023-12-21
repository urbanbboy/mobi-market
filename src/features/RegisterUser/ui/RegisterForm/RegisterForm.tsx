import { useState } from 'react'
import { FirstForm } from '../FirstForm/FirstForm'
import { SecondForm } from '../SecondForm/SecondForm'

export const RegisterForm = () => {
    const [step, setStep] = useState(1)
    const CheckUserIsSuccess = () => {
        setStep(2)
    }

    return (
        <>
            {step === 1 && <FirstForm onSuccess={CheckUserIsSuccess} />}
            {step === 2 && <SecondForm />}
        </>
    )
}
