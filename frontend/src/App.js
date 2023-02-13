import { Navigate, Route, Routes } from "react-router-dom"
import "./style.scss"
import Home from "./page/Home"
import Register from "./page/Register"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
