import Head from 'next/head'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import { Layout } from 'antd';

const { Header, Content} = Layout;

const Report = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>Report</title>
      </Head>

      <Header className="site-layout-background">
        Report
      </Header>

      <Content className="site-layout-background layout-content">
        Report content
      </Content>

    </DefaultLayout>
  )
}

export default Report