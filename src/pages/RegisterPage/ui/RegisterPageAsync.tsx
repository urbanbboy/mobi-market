import { lazy } from 'react';

export const RegisterPageAsync = lazy(() =>
    import('./RegisterPage')
        .then(({RegisterPage}) => ({ default: RegisterPage }))
);
