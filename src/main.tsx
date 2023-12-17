import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@app/providers/router'
import { ErrorBoundary } from '@app/providers/ErrorBoundary'
import App from '@app/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <RouterProvider>
                <App />
            </RouterProvider>
        </ErrorBoundary>
    </React.StrictMode>,
)
