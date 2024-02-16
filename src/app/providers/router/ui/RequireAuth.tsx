import { getUserAuthData } from "@entities/User"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { ACCESS_TOKEN_LOCALSTORAGE_KEY } from "@shared/const/localstorage"
import { RoutePath } from "@shared/config"

interface RequireAuthProps {
    children: JSX.Element
}

export function RequireAuth({ children }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData)
    const access_token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY)
    const location = useLocation()
    
    if(!access_token || !auth) {
        return (
            <Navigate to={RoutePath.login} state={{from: location}} replace />
        )
    } 

    return children
}
