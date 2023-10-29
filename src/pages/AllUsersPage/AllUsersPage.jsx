import { Fragment, useEffect, useState } from "react"
import { useAddDataMutation, useDeleteDataMutation, useGetDataQuery, useGetOneMutation, useUpdateDataMutation, useUpdateUserMutation } from "../../redux/queries/data"
import { useForm } from "antd/es/form/Form"
import { Button, Flex, Form, Input, Modal, Space, Table } from "antd"


const AllUsersPage = () => {

  const [search , setSearch] = useState("")
  const [active , setActive] = useState(1)


  const {data , isFetching , refetch } = useGetDataQuery({url:"users" , search , active})

  const [addData] = useAddDataMutation()
  const [getOne] = useGetOneMutation()
  const [updateData] = useUpdateDataMutation()
  const [deleteData] = useDeleteDataMutation()
  const [updateUserRole] = useUpdateUserMutation()

  let porfolios , total

  if (data) {
    porfolios = data.data
    total = data.pagination.total
  }

  const [selected , setSelected] = useState(null)


  const [isModalOpen , setIsModalOpen] = useState(false)

  const [form] = useForm()


  const [totalPaginate , setTotalPaginate] = useState()

  useEffect(()=>{
    setTotalPaginate(Math.ceil(total / 10))
  } , [total])



  const SerachSkills = (e)=>{
    setSearch(e.target.value)
    setActive(1)
  }

  const showModal = ()=>{
    form.resetFields()
    setSelected(null)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  };

  const handleOk = async ()=>{
    const url = "users"
    try{
      let values = await form.validateFields()
      console.log(values);
      if (selected === null) {
        await addData({ url , values })
      } else {
        console.log(values);
        await updateData({url:`${url}/${selected}` , values})
      }
    } finally{
      refetch()
      setIsModalOpen(false)
    }
  }

  const deletePortfolio = async (id) =>{
    const deleteConfirm = confirm("Bu porfolio ochirilsinmi?")
    if (deleteConfirm) {
      await deleteData({url:`users/${id}`})
      refetch()
    }
  }


  const editData = async (id)=>{
    const url = "users"
    setSelected(id)
    const {data} = await getOne({url:`${url}/${id}`})
    form.setFieldsValue(data)
    setIsModalOpen(true)
  }

  const updateUser = async (id)=>{
    let updateConfirm = confirm("Bu foydalanuvch `client` darajasiga kotarilsinmi")
    let values ={
      role : "client"
    }
    if (updateConfirm) {
      await updateUserRole({url:`users/${id}` , values})
      refetch()
    }
  }

  const columns = [
    {
      title: 'Firstname',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Lastname',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Action',
      key: '_id',
      render : (data) => {
        return (<Space size="middle" >
          <Button onClick={()=>editData(data._id)} type="primary" >Edit</Button>
          <Button onClick={()=>deletePortfolio(data._id)} type="primary" danger >Delete</Button>
          {
            data.role !== "client" ?<Button onClick={()=>updateUser(data._id)} type="primary" danger >Update</Button> : <span type="primary">client</span>
          }
        </Space>)
      }
    },
  ];


  return (
    <Fragment>
      <section id="search">
        <div className="container">
          <div className="search-container">
            <input onChange={SerachSkills} type="text" placeholder="Search..." />
            <button className="modal-open" onClick={showModal}>Create experience</button>
          </div>
        </div>
      </section>            
      <Table loading={isFetching} className="table"  title={()=>(
        <Flex justify="space-between" align="center">
          <h2>users ({total})</h2>
        </Flex>
      )} pagination={false} dataSource={porfolios} columns={columns} />
      {
            totalPaginate > 1 ? <section id="pagination">
            <div className="container">
              <div className="pagination-btns">
                <button disabled={active === 1 ? true : false} onClick={()=>{setActive(active-1)}}>{"<"}</button>
                <span>{active}</span>
                <button disabled={totalPaginate === active ? true : false} onClick={()=>{setActive(active+1)}}>{">"}</button>
              </div>
            </div>
          </section> : null
          }
          <Modal
            open={isModalOpen}
            title="Title"
            onCancel={handleCancel}
            footer={(_, { CancelBtn }) => (
              <>
                <CancelBtn />
              </>
            )}
          > 
                <Form
                    name="basic"
                    labelCol={{
                      span: 24,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={handleOk}
                    autoComplete="off"
                    form={form}
                  >
                    <Form.Item
                      label="Firstname"
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input workname name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Lastname"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: 'Please input companyName description!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Info"
                      name="info"
                      rules={[
                        {
                          required: true,
                          message: 'Please input description description!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: 'Please input startDate description!',
                        },
                      ]}
                    >
                      <Input/>
                    </Form.Item>

                    {
                      selected !== null ? <></> : <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input endDate description!',
                        },
                      ]}
                    >
                      <Input/>
                    </Form.Item>
                    }

                    <Form.Item
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Button
                      name style={{
                        width:"100%"
                      }} type="primary" htmlType="submit">
                        Add
                      </Button>
                    </Form.Item>
                  </Form>
          </Modal>
    </Fragment>
  )
}

export default AllUsersPage