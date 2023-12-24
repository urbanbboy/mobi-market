import { lazy } from 'react';

export const RegisterPageAsync = lazy(() =>
    import('./RegisterPage')
        .then(({RegisterPage}) => ({ default: RegisterPage }))
);

// export const RegisterPageAsync = lazy(() => new Promise((resolve) => {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     //@ts-expect-error
//     setTimeout(() => resolve(import('./RegisterPage')), 1000)
// }))