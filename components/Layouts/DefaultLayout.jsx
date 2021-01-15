import Link from 'next/link';
import {useState} from 'react'
import { Layout, Menu } from 'antd';
import { useRouter } from "next/router";
import {
  MenuOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

import FooterComponent from '../Includes/Footer';

const { Header, Sider, Content, Footer } = Layout;

const DefaultLayout = ({children}) => {
    const router = useRouter();
    const [collapsed, setcollapsed] = useState(false)
    const onCollapse = () => setcollapsed(!collapsed)
    let data = null;
    // console.log('router.asPath :>> ', router.asPath);
    switch (router.asPath) {
        case "/":
            data = "1"
            break;
        case "/Products":
            data = "2"
            break;
        case "/Report":
            data = "3"
            break;
        case "/Setting":
            data = "4"
            break;
        case "/":
            data = "5"
            break;

    }
    const [defaultSelectedKeys, setdefaultSelectedKeys] = useState(data)

    return (

        <Layout>
            <Sider  trigger={null} collapsible collapsed={collapsed} style={{minHeight:'100vh'}}>
            <div className="logo">Stock</div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultSelectedKeys]}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link href="/"> Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                    <Link href="/Products"> Products</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UploadOutlined />}>
                    <Link href="/Report"> Report</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UploadOutlined />}>
                    <Link href="/Setting"> Setting</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<UploadOutlined />}>
                    Logout
                </Menu.Item>
            </Menu>
            </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ paddingLeft: 20 }}>
              <a onClick={onCollapse}><MenuOutlined /></a>
            </Header>
          {children}
          <FooterComponent />
        </Layout>
      </Layout>

        
    )
}

export default DefaultLayout
