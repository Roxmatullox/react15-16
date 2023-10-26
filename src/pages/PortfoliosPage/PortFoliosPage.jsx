import { Fragment, useEffect, useState } from "react"
import { useAddDataMutation, useDeleteDataMutation, useGetDataQuery, useGetOneMutation, useUpdateDataMutation, useUploadPhotoMutation } from "../../redux/queries/data"
import { useForm } from "antd/es/form/Form"
import { Button, Flex, Form, Input, Modal, Space, Table, Upload } from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


const PortFoliosPage = () => {

  const [search , setSearch] = useState("")
  const [active , setActive] = useState(1)


  const {data , isFetching , refetch } = useGetDataQuery({url:"portfolios" , search , active})

  const [uploadPhoto] = useUploadPhotoMutation()
  const [addData] = useAddDataMutation()
  const [getOne] = useGetOneMutation()
  const [updateData] = useUpdateDataMutation()
  const [deleteData] = useDeleteDataMutation()

  let porfolios , total

  if (data) {
    porfolios = data.data
    total = data.pagination.total
  }

  const [photo , setPhoto] = useState(null)

  const [selected , setSelected] = useState(null)

  const [photoLoading , setPhotoLoadnig] = useState(false)

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
    setPhoto(null)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  };

  const handleOk = async ()=>{
    const url = "portfolios"
    try{
      let values = await form.validateFields()
      values = {...values , photo : photo._id}
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
      await deleteData({url:`portfolios/${id}`})
      refetch()
    }
  }


  const editData = async (id)=>{
    const url = "portfolios"
    setSelected(id)
    const {data} = await getOne({url:`${url}/${id}`})
    form.setFieldsValue(data)
    setPhoto(data.photo)
    setIsModalOpen(true)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render : (url)=>{
        return <a href={url}>{url}</a>
      }
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

  const uploadButton = (
    <div>
      {photoLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handlePhoto = async (e)=>{
    try{
      setPhotoLoadnig(true)
      const url = "upload"
      const formData = new FormData()
      formData.append("file" , e.file.originFileObj)
      const {data} = await uploadPhoto({url , formData})
      setPhoto(data);
    } finally{
      setPhotoLoadnig(false)
    }
  }

  return (
    <Fragment>
      <section id="search">
        <div className="container">
          <div className="search-container">
            <input onChange={SerachSkills} type="text" placeholder="Search..." />
            <button className="modal-open" onClick={showModal}>Create portfolio</button>
          </div>
        </div>
      </section>            
      <Table loading={isFetching} className="table"  title={()=>(
        <Flex justify="space-between" align="center">
          <h2>Portfolios ({total})</h2>
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
          >       <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    onChange={handlePhoto}
                  >
                    {photo?._id ? (
                      <img
                        src={`https://ap-portfolio-backend.up.railway.app/upload/${photo._id}.${photo.name.split(".")[1]}`}
                        alt="avatar"
                        style={{
                          width: '100%',
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
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
                      label="Url"
                      name="url"
                      rules={[
                        {
                          required: true,
                          message: 'Please input url description!',
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

export default PortFoliosPage