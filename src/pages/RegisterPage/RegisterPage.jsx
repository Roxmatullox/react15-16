
import {  useState } from "react"
import "./Register.scss"
import request from "../../server"
// import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { setAuth } from "../../redux/slices/auth"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const [isConfirm , setIsConfirm] = useState(true)

  const register = async (e) => {
    e.preventDefault()
    try {
      const values = {
        firstName : e.target.firstName.value ,
        lastName : e.target.lastName.value ,
        username : e.target.username.value ,
        password : e.target.password.value ,
      }

      let confirm = e.target.confirm.value

      if (values.password === confirm) {
        try {
          const {data} = await request.post("auth/register" , values)
          dispatch(setAuth(data.role))
          navigate("/skills")
          Cookies.set("Login" , data.token)
          Cookies.set("Role" , data.role)
        } catch (err) {
          console.log(err);
        }
      }else{
        setIsConfirm(false)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main onSubmit={register}>
      <div className="container">
        <div className="register-section">
          <h1>Register</h1>
          <form >
            <input required id="firstName" placeholder="Firstname" type="text" />
            <input required id="lastName" placeholder="Lastname" type="text" />
            <input required id="username" placeholder="Username" type="text" />
            <input required id="password" placeholder="Password" type="password" />
            <input required id="confirm" placeholder="Confirm password" type="password" />
            {
              isConfirm ? null : <p>Password false !</p>
            }
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage