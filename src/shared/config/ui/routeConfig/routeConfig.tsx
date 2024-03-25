
import { FavoriteProductsPage } from '@pages/FavoriteProductsPage'
import { LoginPage } from '@pages/LoginPage'
import { MyProductsPage } from '@pages/MyProductsPage'
import { NotFoundPage } from '@pages/NotFoundPage'
import { ProductsPage } from '@pages/ProductsPage'
import { ProfilePage } from '@pages/ProfilePage'
import { RegisterPage } from '@pages/RegisterPage'
import { AppRouteProps } from '@shared/types/router'

export enum AppRoutes {
    PRODUCTS = 'products',
    LOGIN = 'login',
    REGISTER = 'register',
    PROFILE = 'profile',
    FAVORITES = 'favorites',
    MY_PRODUCTS = 'my_products',
    NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.PRODUCTS]: '/',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.FAVORITES]: '/favorites',
    [AppRoutes.MY_PRODUCTS]: '/my-products',
    [AppRoutes.NOT_FOUND]: '*',
}

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.PRODUCTS]: {
        path: RoutePath.products,
        element: <ProductsPage />,
        authOnly: true,
        isNewUser: false,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage />
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
        hasSidebar: true,
        isNewUser: true,
    },
    [AppRoutes.FAVORITES]: {
        path: RoutePath.favorites,
        element: <FavoriteProductsPage />,
        authOnly: true,
        hasSidebar: true,
        isNewUser: false,
    },
    [AppRoutes.MY_PRODUCTS]: {
        path: RoutePath.my_products,
        element: <MyProductsPage />,
        authOnly: true,
        hasSidebar: true,
        isNewUser: false,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />
    },
}
