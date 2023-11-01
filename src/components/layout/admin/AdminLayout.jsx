import  { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
const { Header, Sider, Content } = Layout;

import "./AdminLayout.css"
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../../../redux/slices/auth';
import Cookies from 'js-cookie';

const AdminLayout = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  const logout = ()=>{
    const LogoutConfirm = confirm("Akkountdan chiqichni xohlaysizmi?")

    if (LogoutConfirm) {
      dispatch(removeAuth())
      Cookies.remove("Login")
      Cookies.remove("Role")
      navigate("/")
    }
  }


  const location = useLocation()

  return (
    <Layout className='admin-layout'>
      <Sider className='admin-aside' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={location.pathname}
          items={[
            {
              key: '/',
              icon: <UserOutlined />,
              label: <NavLink to="/">Home</NavLink>,
            },
            {
              key: '/dashboard',
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/dashboard">Dashboard</NavLink>,
            },
            {
              key: '/skills',
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/skills">Skills</NavLink>,
            },
            {
              key: '/experiences',
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/experiences">Experiences</NavLink>,
            },{
              key: '/portfolios',
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/portfolios">Portfolios</NavLink>,
            },
            {
              key: '/users',
              icon: <VideoCameraOutlined />,
              label: <NavLink to="/users">Users</NavLink>,
            },
            {
              icon: <UploadOutlined/>,
              label: <a style={{
                height:"100%",
                display:"flex",
                alignItems:"center",
                color:"red",
              }} onClick={logout}>Logout</a>,
            },
          ]}
          
        />
      </Sider>
      <Layout>
        <Header
          style={{
            width:"100%",
            padding: 0,
            background: colorBgContainer,
            display:"flex",
            justifyContent:"space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{
            paddingRight:"40px"
          }}>
            <Link to="/messages">Messages  / </Link>
            <Link to="/account">Account {`->`}</Link>
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
          className='admin-main'
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout