import { lazy } from 'react';

export const LoginPageAsync = lazy(() =>
    import('./LoginPage')
        .then(({LoginPage}) => ({ default: LoginPage }))
);

// export const LoginPageAsync = lazy(() => new Promise((resolve) => {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     //@ts-expect-error
//     setTimeout(() => resolve(import('./LoginPage')), 1000)
// }))