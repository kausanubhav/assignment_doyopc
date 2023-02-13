import axios from "axios"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"

const API_URL = "/create"
export default function Register() {
  const navigate = useNavigate()
  //handleSubmit
  const handleSubmit = async (e) => {
    //prevent refresh
    e.preventDefault()
    const firstName = e.target[1].value
    const email = e.target[0].value
    const lastName = e.target[2].value
    const response = await axios.post(API_URL, {
      email,
      firstName,
      lastName,
    })
    if (response.data) {
      localStorage.setItem("user", JSON.stringify({firstName}))
      toast.success("Joined Successfully")
      navigate('/')
    }
  }
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">MAPOGOs</span>
        <span className="title">Join now</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <button>Sign up</button>
        </form>
      </div>
    </div>
  )
}
