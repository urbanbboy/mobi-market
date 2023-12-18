import { PropsWithChildren } from "react"

export const AuthLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <div className="layout">
                <div className="layout_content">
                    <div className="layout_logo">
                        <img src="/logo.svg" />
                        <span>Mobi market</span>
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}
