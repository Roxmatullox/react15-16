import { BrowserRouter, Route, Routes } from "react-router-dom"

import AdminLayout from "./components/layout/admin/AdminLayout"
import HomePage from "./pages/HomePage/HomePage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import Layout from "./components/layout/user/Layout"
import SkillsPage from "./pages/SkillsPage/SkillsPage"
import { useSelector } from "react-redux"
import { authName } from "./redux/slices/auth"
import DashboardPage from "./pages/DashboardPage/DashboardPage"
import PortFoliosPage from "./pages/PortfoliosPage/PortFoliosPage"
import ExperiencesPage from "./pages/ExperiencesPage/ExperiencesPage"
import AllUsersPage from "./pages/AllUsersPage/AllUsersPage"
import AccountPage from "./pages/AccountPage/AccountPage"
import MessagesPage from "./pages/MessagesPage/MessagesPage"


function App() {

  const {isAuth , role} = useSelector(state=>state[authName])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        {
          isAuth && role === "admin" ? <Route element={<AdminLayout />}>
            <Route path="/skills" element={<SkillsPage/>} />
            <Route path="/dashboard" element={<DashboardPage/>} />
            <Route path="/portfolios" element={<PortFoliosPage/>} />
            <Route path="/users" element={<AllUsersPage/>} />
            <Route path="/experiences" element={<ExperiencesPage/>} />
            <Route path="/messages" element={<MessagesPage/>} />
          </Route>:<></>
        }

        {
          isAuth ? <Route element={<AdminLayout />}>
            <Route path="/account" element={<AccountPage/>} />
          </Route>:<></>
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
