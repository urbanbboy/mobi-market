import { lazy } from 'react';

export const MyProductsPageAsync = lazy(() =>
    import('./MyProductsPage')
        .then(({MyProductsPage}) => ({ default: MyProductsPage }))
);
