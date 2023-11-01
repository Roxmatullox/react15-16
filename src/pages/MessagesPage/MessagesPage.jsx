import { Fragment, useEffect, useState } from "react"
import { useDeleteDataMutation, useGetDataQuery, useUpdateDataMutation } from "../../redux/queries/data"
import Loading from "../Loading/Loading"

import "./MessagesPage.scss"
import { Button, Form, Input, Modal } from "antd"
import { useForm } from "antd/es/form/Form"

const MessagesPage = () => {

  const [active , setActive] = useState(1)

  let search = ""

  const {data} = useGetDataQuery({url:"auth/me" , search , active})

  const [form] = useForm()
  
  const {data : messages , refetch , isFetching } = useGetDataQuery({url:`messages${data ? `?whom=${data._id}` : ""}` , search , active})

  const [deleteData] = useDeleteDataMutation()
  const [updateData] = useUpdateDataMutation()
  
  const [totalPaginate , setTotalPaginate] = useState()

  const [isModalOpen , setIsModalOpen] = useState(false)

  const [selected , setSelected] = useState(null)

  const showModal = ()=>{
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  };

  const handleOk = async ()=>{
    let values = await form.validateFields()
    await updateData({url:`messages/${selected}` , values})
    refetch()
    setIsModalOpen(false)
  }
  
  useEffect(()=>{
    setTotalPaginate(Math.ceil(messages?.pagination.total / 9))
  } , [messages , data])


  const deleteMessage = async (id)=>{
    const deleteConfirm = confirm("Bu porfolio ochirilsinmi?")
    if (deleteConfirm) {
      await deleteData({url:`messages/${id}`})
      refetch()
    }
  }

  const seeMessage = async (id)=>{
    const values = {
      show : false
    }
    console.log(values);
    await updateData({url:`messages/${id}` , values})
    refetch()
  }

  const answerMessage = async (id , data)=>{
    form.setFieldsValue(data)
    setSelected(id)
    showModal()
  }


  return (
    <Fragment>
      <div className="auth-messages">
        {
          isFetching ? <Loading/> : messages.data.map((el)=>{
            return <div key={el._id}>
              <h4>{el.title}</h4>
              <h5>Message : {el.message}</h5>
              <h5>Answer : {el.answer}</h5>
              <div className="actions">
                <Button type="primary" style={{
                  backgroundColor:"red",
                  marginRight:"10px"
                }} onClick={()=>deleteMessage(el._id)}>Delete</Button>

                <Button type="primary" style={{
                  backgroundColor:"blue",
                  marginRight:"10px"
                }} onClick={()=>answerMessage(el._id , el)}>To answer</Button>

                {
                  el.show ? <Button type="primary" style={{
                    backgroundColor:"green"
                  }} onClick={()=>seeMessage(el._id)}>See</Button> :<span>Seen</span>
                }
              </div>
            </div>
          })
        }
      </div>
      {
        totalPaginate > 1 ? <section id="pagination">
          <div className="container">
            <div className="pagination-btns">
              <button disabled={active === 1 ? true : false} onClick={()=>{setActive(active-1)}}>{"<"}</button>||
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
                      label="Answer"
                      name="answer"
                      rules={[
                        {
                          required: true,
                          message: 'Please input answer!',
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

export default MessagesPage