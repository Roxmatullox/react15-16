

import "./HomePage.scss"

import menuBg from "../../assets/menu-ng.jpg";
import { useAddDataMutation, useGetDataQuery } from "../../redux/queries/data";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Button, Form, Input, Modal, message } from "antd";
import { useForm } from "antd/es/form/Form";

const HomePage = () => {


  const [addData] = useAddDataMutation()

  const [active , setActive] = useState(1)

  let search = ""

  const {data : messages , isFetching , refetch } = useGetDataQuery({url:"messages?limit=3" , search , active})

  const [totalPaginate , setTotalPaginate] = useState()

  const [form] = useForm()

  const [messageApi , contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Habar jo`natoldi !',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Habarda hatolik !',
    });
  };


  useEffect(()=>{
    setTotalPaginate(Math.ceil(messages?.pagination.total / 3))
  } , [messages])

  const [isModalOpen , setIsModalOpen] = useState(false)

  const showModal = ()=>{
    setIsModalOpen(true)
    form.resetFields()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  };

  const handleOk = async ()=>{
    try {
      let values = await form.validateFields()
      await addData({ url:"messages" , values })
      refetch()
      success()
      setIsModalOpen(false)
    } catch (err) {
      error()
    }
  }
  
  useEffect(()=>{
    setTotalPaginate(Math.ceil(messages?.pagination.total / 9))
  } , [messages])

  return (
    <div className="home">
       {contextHolder}
      <div className="container">
        <div className="home-section">
          <div className="home-text">
            <h1>Welcome to {`rzzzy's`} site</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia eos eaque labore, aliquam sunt quia, minima quidem quibusdam id, quod repudiandae? Provident aliquam possimus voluptatem sed, dignissimos non sunt incidunt quo voluptas minus quae libero aut consequatur accusantium, deleniti dolore, nisi labore velit laborum cumque repudiandae sint officia. Amet, veritatis eius? Mollitia eum excepturi cum ratione hic ab. Enim dicta nesciunt porro atque quasi consequatur adipisci corrupti vitae expedita excepturi labore sed, eos ducimus doloribus mollitia voluptate veritatis, voluptatum nemo repellat. Maxime impedit nobis atque quod ea asperiores et facilis nam perspiciatis animi. Voluptatum quam beatae nulla, nesciunt sapiente incidunt!
            </p>
          </div>
          <img src={menuBg} alt="" />
        </div>
      </div>
      <div className="container">
          <h2 style={{
            textAlign:"center",
            color:"white"
          }}>Messages</h2>
        <div className="messages">
          {
            isFetching ? <Loading/> :messages?.data.map((el)=>{
              return <div key={el._id}>
                <h3>{el.title} | user : {el.user}</h3>
                <p>{el.message}</p>
                </div>
            })
          }
        </div>
      </div>
      <div className="create-message">
        <div className="container">
          <Button style={{
            marginTop:"20px",
          }} type="primary" onClick={()=>showModal()}>Create message</Button>
        </div>
      </div>
      {
          totalPaginate > 1 ? <section id="pagination">
            <div className="container">
              <div className="pagination-btns">
                <button disabled={active === 1 ? true : false} onClick={()=>{setActive(active-1)}}>{"<"}</button> <span></span>
                <button disabled={totalPaginate === active ? true : false} onClick={()=>{setActive(active+1)}}>{">"}</button>
              </div>
            </div>
          </section> : null
          }

          <Modal
            open={isModalOpen}
            title="Admin bilan boglanish uchun 'whom' degan joyga (6540ec19ad767e0018d609de) Id ni kiriting !"
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
                      label="Title"
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: 'Please input title !',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Message"
                      name="message"
                      rules={[
                        {
                          required: true,
                          message: 'Please input message!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Whom"
                      name="whom"
                      rules={[
                        {
                          required: true,
                          message: 'Please input whom this message!',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="User"
                      name="user"
                      rules={[
                        {
                          required: true,
                          message: 'Please input user!',
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
                        Send
                      </Button>
                    </Form.Item>
                  </Form>
          </Modal>
    </div>
  )
}

export default HomePage