import { lazy } from 'react';

export const LoginPageAsync = lazy(() =>
    import('./LoginPage')
        .then(({LoginPage}) => ({ default: LoginPage }))
);
