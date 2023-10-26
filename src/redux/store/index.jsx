import PropTypes from "prop-types"

import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import authReducer, { authName } from "../slices/auth"
import skillsReducer, { skillsName } from "../slices/skills"
import dataQuery, { dataQueryName, dataQueryReducer } from "../queries/data"



const reducer = {
  [authName] : authReducer,
  [skillsName] : skillsReducer,
  [dataQueryName] : dataQueryReducer,
}

const store = configureStore({ reducer ,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(dataQuery.middleware), 
 })

const StoreProvider = ({children})=>{
  return(
    <Provider store={store} >{children}</Provider>
  )
}


StoreProvider.propTypes = {
  children : PropTypes.node
}

export default StoreProvider