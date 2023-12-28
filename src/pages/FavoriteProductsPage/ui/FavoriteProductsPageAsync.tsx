import { lazy } from 'react';

export const FavoriteProductsPageAsync = lazy(() =>
    import('./FavoriteProductsPage')
        .then(({FavoriteProductsPage}) => ({ default: FavoriteProductsPage }))
);

// export const MainPageAsync = lazy(() => new Promise((resolve) => {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     //@ts-expect-error
//     setTimeout(() => resolve(import('./MainPage')), 1000)
// }))