import { Fragment, useEffect, useState } from "react"
import { useAddDataMutation, useDeleteDataMutation, useGetDataQuery, useGetOneMutation, useUpdateDataMutation } from "../../redux/queries/data"
import { useForm } from "antd/es/form/Form"
import { Button, Flex, Form, Input, Modal, Space, Table } from "antd"


const ExperiencesPage = () => {

  const [search , setSearch] = useState("")
  const [active , setActive] = useState(1)


  const {data , isFetching , refetch } = useGetDataQuery({url:"experiences" , search , active})

  const [addData] = useAddDataMutation()
  const [getOne] = useGetOneMutation()
  const [updateData] = useUpdateDataMutation()
  const [deleteData] = useDeleteDataMutation()

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
    const url = "experiences"
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
      await deleteData({url:`experiences/${id}`})
      refetch()
    }
  }


  const editData = async (id)=>{
    const url = "experiences"
    setSelected(id)
    const {data} = await getOne({url:`${url}/${id}`})
    const valuesWithDate = {
      ...data,
      startDate : data.startDate.split("T")[0],
      endDate : data.endDate.split("T")[0]
    }
    form.setFieldsValue(valuesWithDate)
    setIsModalOpen(true)
  }

  const columns = [
    {
      title: 'Workname',
      dataIndex: 'workName',
      key: 'workName',
    },
    {
      title: 'Companyname',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render : (data) => {
        return (<Space size="middle" >
          <Button onClick={()=>editData(data)} type="primary" >Edit</Button>
          <Button onClick={()=>deletePortfolio(data)} type="primary" danger >Delete</Button>
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
          <h2>Experiences ({total})</h2>
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
                      label="Workname"
                      name="workName"
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
                      label="Company"
                      name="companyName"
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
                      label="Description"
                      name="description"
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
                      label="Start date"
                      name="startDate"
                      rules={[
                        {
                          required: true,
                          message: 'Please input startDate description!',
                        },
                      ]}
                    >
                      <Input type="date" />
                    </Form.Item>

                    <Form.Item
                      label="End date"
                      name="endDate"
                      rules={[
                        {
                          required: true,
                          message: 'Please input endDate description!',
                        },
                      ]}
                    >
                      <Input type="date" />
                    </Form.Item>

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

export default ExperiencesPage