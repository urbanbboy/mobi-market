import { lazy } from 'react';

// export const ProfilePageAsync = lazy(() =>
//     import('./ProfilePage')
//         .then(({ProfilePage}) => ({ default: ProfilePage }))
// );

export const ProfilePageAsync = lazy(() => new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    setTimeout(() => resolve(import('./ProfilePage')), 1000)
}))