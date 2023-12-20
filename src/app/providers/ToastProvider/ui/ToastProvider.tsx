import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    )
}