import { Route, Routes } from "react-router-dom"
import { routeConfig } from "../config/routeConfig"
import { Suspense } from "react"
import { PageLoader } from "@widgets/PageLoader"

export const AppRouter = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routeConfig).map(({ path, element }) => (
                    <Route
                        key={path}
                        path={path}
                        element={(
                            <div>
                                {element}
                            </div>
                        )}
                    />
                ))}
            </Routes>
        </Suspense>
    )
}
