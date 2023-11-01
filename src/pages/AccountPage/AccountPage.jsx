import { Button, Upload } from "antd"
import { Fragment, useEffect, useState } from "react"

import "./AccountPage.scss"
import { useGetDataQuery, useUpdateDataMutation, useUploadPhotoMutation } from "../../redux/queries/data"
import Loading from "../Loading/Loading"

const AccountPage = () => {

  let search , active

  const {data , isFetching , refetch } = useGetDataQuery({url:"auth/me" , search , active})


  const [photo , setPhoto] = useState(data?.photo)


  const [uploadPhoto] = useUploadPhotoMutation()
  const [updateData] = useUpdateDataMutation()

  const [values , setValues] = useState(
    {
      photo : data?.photo,
      first_name:data?.firstName,
      last_name : data?.lastName,
      username:data?.username,
      info : data?.info,
      phoneNumber:data?.phoneNumber,
      birthday : data?.birthday,
      address : data?.address,
      email : data?.email,
    }
  )

  useEffect(()=>{
    setValues(
      {
        photo : data?.photo,
        first_name:data?.firstName,
        last_name : data?.lastName,
        username:data?.username,
        info : data?.info,
        phoneNumber:data?.phoneNumber,
        birthday : data?.birthday,
        address : data?.address,
        email : data?.email,
      }
    )

    setPhoto(data?.photo)
  } , [data])

  const handleOk= async(e)=>{
    e.preventDefault()
    console.log(values);
    await updateData({url:"auth/updatedetails" , values})
    refetch()
  }

  const handlePhoto = async (e)=>{
      const url = "auth/upload"
      const formData = new FormData()
      formData.append("file" , e.file.originFileObj)
      const {data} = await uploadPhoto({url , formData})
      console.log(`${data._id}.${data.name.split(".")[1]}`);
      setPhoto(`${data._id}.${data.name.split(".")[1]}`);
      setValues({
        ...values ,
        photo : `${data._id}.${data.name.split(".")[1]}`
      })
  }

  const getValues =  (e) =>{
    setValues({...values , 
      [e.target.name]:e.target.value
    })
  }

  return (
    <main>
      {
        isFetching ? <Loading/> : <></>
      }
      {
        <Fragment>
          <div className="container">
          <h1>Account</h1>
            <div className="account-page">
              <div className="account-page-img">
              <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    onChange={handlePhoto}
                  >
                    {values.photo ? (
                      <img
                        src={`https://ap-portfolio-backend.up.railway.app/upload/${photo}`}
                        alt="avatar"
                        style={{
                          width: '100%',
                          height:"100%",
                          objectFit:"cover"
                        }}
                      />
                    ) : (
                      <p>Upload</p>
                    )}
                  </Upload>
              </div>
              <div className="account-page-inputs">
                <form onChange={getValues} onSubmit={handleOk} >
                  <input required value={values.first_name} name="first_name" placeholder="Firstname" type="text" />
                  <input required value={values.last_name} name="last_name" placeholder="Lastname" type="text" />
                  <input required value={values.username}  name="username" placeholder="Username" type="text" />
                  <input value={values.info} name="info" placeholder="Info" type="text" />
                  <input value={values.phoneNumber} name="phoneNumber" placeholder="Phone number" type="text" />
                  <input value={values?.birthday?.split("T")[0]} name="birthday" placeholder="Birthday" type="date" />
                  <input value={values.address} name="address" placeholder="Address" type="text" />  
                  <input value={values.email} name="email" placeholder="email" type="email" /> 
                  <Button htmlType="submit">Save</Button>
                </form> 
              </div>
            <Button type="primary" className="logout-btn">Logout</Button>
            </div>
          </div>
        </Fragment>
      }
    </main>
  )
}

export default AccountPage