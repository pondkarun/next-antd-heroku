import Head from 'next/head'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import ProductService from '../services/ProductService'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'


import { Layout, Row, Table, Space, Col, Modal, Form, Input, Button } from 'antd';

const { Header, Content } = Layout;

const Product = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    getData()
  }, [])


  const columns = [
    {
      title: 'Image',
      dataIndex: 'product_image',
      key: 'id',
      render: img => <img src={img} alt="img" width="50px" />,
    },
    {
      title: 'Barcode',
      dataIndex: 'product_barcode',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'id',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'product_price',
      key: 'id',
      render: text => <a>{Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
      }).format(text)}</a>,
    },

    {
      title: 'Action',
      key: 'action',
      render: (obj) => (
        <Space size="middle">
          <a onClick={() => editDel(obj.id, "edit")}>Edit</a>
          <a onClick={() => editDel(obj.id, "del")}>Delete</a>
        </Space>
      ),
    },
  ];

  const editDel = (id, mode) => {
    if (mode === "del") {
      Swal.fire({
        title: 'ข้อความจากระบบ',
        text: "ยืนยันการลบข้อมูล",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          ProductService.deleteProduct(id).then(res => {
            Swal.fire(
              'Deleted!',
              'ลบสำเร็จ',
              'success'
            )
            getData()
          }).catch(err => {

          })
        }
      })
    } else if (mode === "edit") {
      ProductService.getProductById(id).then(res => {
        console.log('res.data :>> ', res.data);
        console.log('form :>> ', form);
        form.setFieldsValue(res.data)
        setProduct(res.data)
        showModal()
      }).catch(err => {

      })
    }

  }

  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getData = () => {
    ProductService.getAllProduct().then(res => {
      // console.log('res :>> ', res.data);
      setData(res.data)
    })
  }


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    console.log('product :>> ', product);
    if (product.id) {
      let data = {
        "product_name": product.product_name,
        "product_detail": product.product_detail,
        "product_barcode": product.product_barcode,
        "product_image": product.product_image,
        "product_price": product.product_price,
        "product_qty": product.product_qty
      }
      ProductService.updateProduct(product.id, data).then((res) => {
        setVisible(false);
        setConfirmLoading(false);
        setProduct(productFormData)
        form.resetFields();
        getData()
      }).catch((err) => {
        setConfirmLoading(false);
      })
    } else {
      let data = {
        "product_name": product.product_name,
        "product_detail": product.product_detail,
        "product_barcode": product.product_barcode,
        "product_image": product.product_image,
        "product_price": product.product_price,
        "product_qty": product.product_qty
      }

      ProductService.addNewProduct(data).then((res) => {
        setVisible(false);
        setConfirmLoading(false);
        setProduct(productFormData)
        form.resetFields();
        getData()
      }).catch((err) => {
        setConfirmLoading(false);
      })
    }

  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    form.resetFields();
    setVisible(false);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


  const productFormData = {
    "product_name": "",
    "product_detail": "",
    "product_barcode": "",
    "product_image": "",
    "product_price": "",
    "product_qty": ""
  }

  const [product, setProduct] = useState(productFormData)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setProduct({ ...product, [name]: value })
  };


  return (
    <DefaultLayout>
      <Head>
        <title>Product</title>
      </Head>

      <Header className="site-layout-background">
        <Row>
          <Col span={12}>Product</Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Button type="primary" onClick={showModal} >
              Add +
            </Button>
            <Modal
              title="Title"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  ยกเลิก
                </Button>,
                <Button key="submit" type="primary" form="myForm2" key="submit" htmlType="submit">
                  บันทึก
                </Button>,
              ]}
            >
              <Form {...layout} id="myForm2"
                form={form}
                name="control-hooks"
                onFinish={handleOk}
                initialValues={productFormData}
              >

                <Form.Item
                  name="product_name"
                  label="Product Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input name="product_name" onChange={handleInputChange} />
                </Form.Item>

                <Form.Item
                  name="product_detail"
                  label="Detaile"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea name="product_detail" onChange={handleInputChange} />
                </Form.Item>

                <Form.Item
                  name="product_barcode"
                  label="Barcode"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input name="product_barcode" onChange={handleInputChange} />
                </Form.Item>

                <Form.Item
                  name="product_image"
                  label="Link Image"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input name="product_image" onChange={handleInputChange} />
                </Form.Item>

                <Form.Item
                  name="product_price"
                  label="Price"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input name="product_price" onChange={handleInputChange} />
                </Form.Item>

                <Form.Item
                  name="product_qty"
                  label="qty"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input name="product_qty" onChange={handleInputChange} />
                </Form.Item>

              </Form>
            </Modal>
          </Col>
        </Row>

      </Header>

      <Content className="site-layout-background layout-content">
        <h1>Product</h1>
        <Table columns={columns} dataSource={data} rowKey={(data) => data.id} />
      </Content>

    </DefaultLayout>
  )
}

export default Product
