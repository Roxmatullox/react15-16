import { useSelector } from "react-redux";
import { authName } from "../../../redux/slices/auth";
import "./Layout.scss"

import { NavLink } from "react-router-dom";


const Header = () => {

  const {isAuth , role} = useSelector(state=>state[authName])

  console.log(role);

  return (
    <header className="header">
      <div className="container">
        <nav>
          <div className="header-left">
            <NavLink to="">Home</NavLink>
            {
              isAuth && role === "admin" ? <><a> || </a> <NavLink to="dashboard">Dashboard</NavLink></> : ""
            }
          </div>
          <div className="header-right">
            <NavLink to="register">Register</NavLink>
            {
              isAuth ? <NavLink to="/account">Account {`->`}</NavLink> : <NavLink to="login">Login</NavLink>
            }
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header