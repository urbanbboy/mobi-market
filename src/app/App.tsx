import { AppRouter } from "./providers/router"
import './styles/index.scss'

function App() {

    return (
        <div className="app">
            <div className="content-page">
                <AppRouter />
            </div>
        </div>
    )
}

export default App