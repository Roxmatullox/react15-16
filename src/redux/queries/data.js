import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const dataQueryName = "data"

const dataQuery = createApi({
  reducerPath:dataQueryName,
  baseQuery : fetchBaseQuery({
    baseUrl : `https://ap-portfolio-backend.up.railway.app/api/v1`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get("Login")}`);
      return headers;
    },
  }),
  endpoints : (builder)=>({
    getData : builder.query({
      query:({url , search , active})=>({
        method:"GET",
        url : `${url}`,
        params : {
          search,
          page:active
        }
      })
    }),
    uploadPhoto : builder.mutation({
      query : ({url , formData})=>({
        method : "POST",
        url,
        body : formData
      } )
    }),
    addData : builder.mutation({
      query : ({url , values})=>({
        method : "POST",
        url,
        body : values
      } )
    }),
    updateData : builder.mutation({
      query : ({url , values})=>({
        method : "PUT",
        url,
        body : values
      } )
    }),
    deleteData : builder.mutation({
      query : ({url})=>({
        method : "DELETE",
        url,
      } )
    }),
    getOne : builder.mutation({
      query : ({url})=>({
        method : "GET",
        url,
      } )
    }),
    updateUser : builder.mutation({
      query : ({url , values})=>({
        method : "PUT",
        url,
        body : values
      })
    })
  })
})


const { reducer : dataQueryReducer } = dataQuery

export default dataQuery

export { dataQueryName , dataQueryReducer }

export const {useGetDataQuery , useUploadPhotoMutation , useAddDataMutation , useGetOneMutation , useUpdateDataMutation , useDeleteDataMutation , useUpdateUserMutation } = dataQuery