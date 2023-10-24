import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

const authName = "auth"

const initialState = {
  isAuth : Boolean(Cookies.get("Login")) ,
  role : Boolean(Cookies.get("role")),
}

const authSlice = createSlice({
  initialState,
  name: authName ,
  reducers:{
    setAuth(state , {payload}){
      state.isAuth = true
      state.role = payload
    },
    removeAuth(state){
      state.isAuth = false
      state.role = null
    }
  }
})

const {setAuth , removeAuth} = authSlice.actions

export {setAuth , removeAuth}

const authReducer = authSlice.reducer
export default authReducer

export {authName}