import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import request from "../../server"


const skillsName = "skills"

const initialState = {
  skills:[],
  total:0,
  loading : false,
}

export const getSkills = createAsyncThunk("skill/fetching" , async ({active = 1 , search})=>{
  const params = {
    search,
    page:active,
    limit : 4
  }
  const {data} = await request.get("skills" , {params})
  return data
})

const SkillSlice = createSlice({
  initialState,
  name:skillsName,
  reducers:{},
  extraReducers:{
    [getSkills.pending] : (state)=>{
      state.loading = true
    },
    [getSkills.fulfilled] : (state , {payload : {data , pagination}})=>{
      state.skills = data,
      state.total = pagination.total
      state.loading = false
    },
    [getSkills.rejected] : (state)=>{
      state.loading = false
    },
  }
})

const skillsReducer = SkillSlice.reducer

export {skillsName}

export default skillsReducer

