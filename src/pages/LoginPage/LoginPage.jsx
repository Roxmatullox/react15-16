
import Cookies from "js-cookie"
import request from "../../server"
import "./Login.scss"
import { authName, setAuth } from "../../redux/slices/auth"

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const LoginPage = () => {

  const { role} = useSelector(state=>state[authName])

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const login = async (e) =>{
    e.preventDefault()
    try {
      const values = {
        username : e.target.username.value ,
        password : e.target.password.value
      }
      const {data} = await request.post("auth/login" , values)
      dispatch(setAuth(data.user.role))
      if (role === "admin") {
        navigate("/dashboard")
      } else{
        navigate("/")
      }
      Cookies.set("Login" , data.token)
      Cookies.set("Role" , data.user.role)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <div className="container">
        <div className="login-section">
          <h1>Login</h1>
          <form onSubmit={login}>
            <input required id="username" placeholder="Username" type="text" />
            <input required id="password" placeholder="Password" type="password" />
            <button type="submit" >Login</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default LoginPage