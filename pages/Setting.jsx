import Head from 'next/head'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import { Layout } from 'antd';

const { Header, Content} = Layout;

const Setting = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Setting</title>
      </Head>

      <Header className="site-layout-background">
        Setting
      </Header>

      <Content className="site-layout-background layout-content">
        Setting content
      </Content>

    </DefaultLayout>
  )
}

export default Setting