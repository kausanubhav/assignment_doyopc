import { Navigate, Route, Routes } from "react-router-dom"
import "./style.scss"
import Home from "./page/Home"
import Register from "./page/Register"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useState } from "react"

function App() {
  // const [user, setUser] = useState("")

  // const getUser = useCallback(() => {
  //   return JSON.parse(localStorage.getItem("user"))
  // }, [])
  // useEffect(() => {
  //   setUser(getUser())
  // }, [getUser])
  // console.log("rendered",user)

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/register" />
          }
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
