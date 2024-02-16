import { Route, Routes } from "react-router-dom"
import { Suspense, memo, useCallback } from "react"
import { PageLoader } from "@widgets/PageLoader"
import { AppRouteProps } from "@shared/types/router"
import { RequireAuth } from "./RequireAuth"
import { Sidebar } from "@widgets/Sidebar"
import { routeConfig } from "@shared/config"

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                {route.hasSidebar
                    ? <div className="withSidebar">
                        <Sidebar />
                        {route.element}
                    </div>
                    : route.element
                }
            </Suspense>
        )

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }

            />
        )
    }, [])

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}

export default memo(AppRouter)