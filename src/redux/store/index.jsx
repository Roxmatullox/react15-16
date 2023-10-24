import PropTypes from "prop-types"

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import authReducer, { authName } from "../slices/auth"
import skillsReducer, { skillsName } from "../slices/skills"



const reducer = {
  [authName] : authReducer,
  [skillsName] : skillsReducer,
}

const store = configureStore({ reducer })

const StoreProvider = ({children})=>{
  return(
    <Provider store={store} >{children}</Provider>
  )
}


StoreProvider.propTypes = {
  children : PropTypes.node
}

export default StoreProvider