import React, { useState, useEffect } from "react";
import "./style.css";
import DataTable from "react-data-table-component";
import {
  Modal,
  message,
  Button,
  Form,
  Input,
  Pagination,
  Card,
 } from "antd";
import { DeleteFilled } from "@ant-design/icons";
 import Search22 from "../search";
import { price } from "../../helper/axios";

function Product() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [loading, setloading] = useState(false);
  const [addloading, setaddloading] = useState(false);
  const [data, setdata] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowdata, setRowData] = useState();
  const [loadingedit, setLoadingEdit] = useState(false);
  const [searchstring, setsearchstring] = useState("");
  const [title, setTitle] = useState("");
  const [prices, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionOne, setDescriptionOne] = useState("");
  const [descriptionTwo, setDescriptionTwo] = useState("");
 
  const showModal = (row) => {
    setRowData(row);
    setTitle(row?.title);
    setPrice(row?.price);
    setDescription(row?.description);
    setDescriptionOne(row?.description);
    setDescriptionTwo(row?.description);
    setIsModalVisible(true);
    console.log(row, "ab");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addModal = () => {
    setIsModalShow(true);
  };

  const clickCancel = () => {
    setIsModalShow(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChange2 = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values) => {
    console.log(values);
    setaddloading(true);

    price({
      method: "post",
      data: {
        title: values?.title,
        price: values?.price,
        description: values?.description,
        descriptionOne: values?.descriptionOne,
        descriptionTwo: values?.descriptionTwo,
      },
    })
      .then(() => {
        setaddloading(false);
        setIsModalShow(false);
        form.resetFields();
        message.success("Price created!");
      })
      .catch(() => {
        setaddloading(false);
        message.error("an error occured please try later");
      });
  };
  const getPrice = () => {
    setloading(true);

    price({
      method: "get",
      params: {
        page: currentPage,
        limit: perPage,
      },
    })
      .then((res) => {
        console.log(res.data.results, "pro");
        setdata(res.data.results);
        setloading(false);
      })
      .catch(() => {
        message.error("an error occured please try later");
        setloading(false);
      });
  };
  const deletePrice = (id) => {
    price(`/${id}`, {
      method: "delete",
      headers: {},
    })
      .then(() => {
        message.success("Deleted");
        getPrice();
      })
      .catch(() => {
        message.error("an error occured please try later");
      });
  };
  const handleUpdate = (item) => {
    setLoadingEdit(true);

    let data = {
      title: item.title,
      price: item.price,
      Description: item.Description,
      descriptionOne: item.descriptionOne,
      descriptionTwo: item.descriptionTwo,
    };

    price(`/${item.id}`, {
      method: "patch",
      data: data,
      headers: {},
    })
      .then(() => {

        setLoadingEdit(false);
        message.success("Updated!");
    
      })

      .catch(() => {
        setLoadingEdit(false);
        message.error("something went wrong, please try again!");
      })
      .finally(() => {
        getPrice();
        setIsModalVisible(false);
      });
  };
  const columns = [
    {
      name: "Title",
      selector: (row) => row?.title,
    },

    {
      name: "Price",
      selector: (row) => row?.price,
    },
    {
      name: "Description",
      selector: (row) => row?.description,
    },
    {
      name: "DescriptionOne",
      selector: (row) => row?.descriptionOne,
    },
    {
      name: "DescriptionTwo",
      selector: (row) => row?.descriptionTwo,
    },
    {
      name: "Edit",
      selector: (row) => (
        <button className="tagger" color="lime" onClick={() => showModal(row)}>
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <>
          <a onClick={() => deletePrice(row.id)}>
            <DeleteFilled style={{ fontSize: "1rem", color: "grey" }} />
          </a>
        </>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
  };

  useEffect(() => {
    getPrice();
  }, [perPage, currentPage, searchstring, isModalShow]);
  console.log(data, "price");
  return (
    <>
      <div>
        <div className="centerinputbtn">
          <h2>Pricing</h2>
          <div className="price-div">
            <div className="input22">
              <Search22
                searchstring={searchstring}
                setsearchstring={setsearchstring}
              />
            </div>
            <div className="institutebtn">
              <button onClick={addModal} className="create-button">
                Add Prcing
              </button>
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />
        <Pagination
          className="pagination"
          total={currentPage}
          defaultPageSize={perPage}
        />
        <Modal
          title="Edit Product"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Card
            style={{ width: 470 }}
            actions={[
              <div>
                <Button
                  className="form-Button"
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    handleUpdate(
                      {
                        title: title,
                        price: prices,
                        description: description,
                        descriptionOne: descriptionOne,
                        descriptionTwo: descriptionTwo,
                        id: rowdata.id,
                      },
                      rowdata.status
                    );
                  }}
                  loading={loadingedit}
                >
                  Update
                </Button>
              </div>,
            ]}
          >
            <div className="dispaly-flex">
              <div>
                <h4>Title</h4>
                <Input
                  value={title}
                  className="input-update"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="divspacer">
                <h4>price</h4>
                <Input
                  value={prices}
                  className="input-update"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="dispaly-flex">
              <div className="divspacer">
                <h4>Description</h4>
                <Input.TextArea
                  showCount
                  maxLength={100}
                  value={description}
                  className="input-update2"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="dispaly-flex">
              <div className="divspacer">
                <h4>DescriptionOne</h4>
                <Input.TextArea
                  showCount
                  maxLength={100}
                  value={descriptionOne}
                  className="input-update2"
                  onChange={(e) => setDescriptionOne(e.target.value)}
                />
              </div>
            </div>
            <div className="dispaly-flex">
              <div className="divspacer">
                <h4>DescriptionTwo</h4>
                <Input.TextArea
                  showCount
                  maxLength={100}
                  value={descriptionTwo}
                  className="input-update2"
                  onChange={(e) => setDescriptionTwo(e.target.value)}
                />
              </div>
            </div>
          </Card>
        </Modal>
        <Modal
          footer={null}
          title="Add product"
          visible={isModalShow}
          onCancel={clickCancel}
        >
          <Form
            form={form}
            layout="vertical"
            name="register"
            onFinish={onFinish}
            onChange={handleChange}
          >
            <Form.Item
              name="title"
              label="title"
              rules={[
                {
                  required: true,
                  message: "Please input your product Name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input Description",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
            <Form.Item
              name="descriptionOne"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input descriptionOne",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
            <Form.Item
              name="descriptionTwo"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input descriptionOne",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
            <Form.Item>
              <div className="form-item">
                <Button
                  className="form-Button"
                  htmlType="submit"
                  loading={loading}
                >
                  Create Product
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default Product;
