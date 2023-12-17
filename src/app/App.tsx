import { Header } from "@widgets/Header"
import { AppRouter } from "./providers/router"
import './styles/index.scss'

function App() {

    return (
        <div className="app">
            <Header />
            <div className="content-page">
                <AppRouter />
            </div>
        </div>
    )
}

export default App