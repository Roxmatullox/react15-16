import { Button, Flex, Form, Input, Modal, Space, Table } from "antd"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getSkills, skillsName } from "../../redux/slices/skills";

import "./SkillsPage.scss"
import { useForm } from "antd/es/form/Form";
import request from "../../server";

const SkillsPage = () => {

  const dispatch = useDispatch()

  const [selected , setSelected] = useState(null)

  const [refresh , setRefresh] = useState(false)

  const [isModalOpen , setIsModalOpen] = useState(false)

  const [form] = useForm()

  const [active , setActive] = useState(1)
  const [totalPaginate , setTotalPaginate] = useState()

  const [search , setSearch] = useState("")

  const {skills , total , loading} = useSelector(state=>state[skillsName])

  useEffect(()=>{
    dispatch(getSkills({active , search}))
    setTotalPaginate(total/6)
  } , [dispatch , total , active , search , refresh])

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
    const values = await form.validateFields()

    try {
      if (selected === null) {
        await request.post("skills" , values)
      } else{
        await request.put(`skills/${selected}` , values)
      }
    } catch (err) {
      console.log(err);
    } finally{
      setIsModalOpen(false)
      setRefresh(!refresh)
    }
  }

  const deleteData = async (id) =>{
    const deleteConfirm = confirm("Bu skill ochirilsinmi?")
    if (deleteConfirm) {
      try{
        await request.delete(`skills/${id}`)
      } finally{
        setRefresh(!refresh)
      }
    }
  }


  const editData = async (id)=>{
    setSelected(id)
    const {data} = await request.get(`skills/${id}`)
    console.log(data);
    form.setFieldsValue(data)
    setIsModalOpen(true)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Percent',
      dataIndex: 'percent',
      key: 'percent',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render : (data) => {
        return (<Space size="middle" >
          <Button onClick={()=>editData(data)} type="primary" >Edit</Button>
          <Button onClick={()=>deleteData(data)} type="primary" danger >Delete</Button>
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
            <button className="modal-open" onClick={showModal}>Create skill</button>
          </div>
        </div>
      </section>            
      <Table loading={loading} className="table"  title={()=>(
        <Flex justify="space-between" align="center">
          <h2>Skills ({total})</h2>
        </Flex>
      )} pagination={false} dataSource={skills} columns={columns} />
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
                      label="Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input skill name!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Percent"
                      name="percent"
                      rules={[
                        {
                          required: true,
                          message: 'Please input category description!',
                        },
                      ]}
                    >
                      <Input />
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

export default SkillsPage