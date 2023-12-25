import { lazy } from 'react';

export const ProductsPageAsync = lazy(() =>
    import('./ProductsPage')
        .then(({ProductsPage}) => ({ default: ProductsPage }))
);

// export const MainPageAsync = lazy(() => new Promise((resolve) => {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     //@ts-expect-error
//     setTimeout(() => resolve(import('./MainPage')), 1000)
// }))