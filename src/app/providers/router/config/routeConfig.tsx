import { RouteProps } from 'react-router-dom'

export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    REGISTER = 'register',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',

}

export const routeConfig:  Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <div>MAINPAGE</div>
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <div>LOGINPAGE</div>
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <div>REGISTERPAGE</div>
    },
}
