import { useEffect } from "react"
import { AppRouter } from "./providers/router"
import './styles/index.scss'
import { getUserInited, userActions } from "@entities/User"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@shared/lib/hooks/useAppDispatch/useAppDispatch"
import { PageLoader } from "@widgets/PageLoader"
import { refreshAccessToken } from "@features/LoginUser"

function App() {
    const dispatch = useAppDispatch()
    const inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(userActions.initAuthData())
        dispatch(refreshAccessToken())
    }, [dispatch])

    if(!inited) {
        return <PageLoader />
    }

    return (
        <div className="app">
            <div className="content-page">
                {inited && <AppRouter />}
            </div>
        </div>
    )
}

export default App