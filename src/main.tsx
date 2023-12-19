import React from 'react'
import ReactDOM from 'react-dom/client'
import { StoreProvider } from '@app/providers/StoreProvider'
import { ErrorBoundary } from '@app/providers/ErrorBoundary'
import { RouterProvider } from '@app/providers/router'
import App from '@app/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StoreProvider>
            <ErrorBoundary>
                <RouterProvider>
                    <App />
                </RouterProvider>
            </ErrorBoundary>
        </StoreProvider>
    </React.StrictMode>,
)
