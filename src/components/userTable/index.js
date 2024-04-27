import React, { useState, useEffect } from "react";
import "./style.css";
import DataTable from "react-data-table-component";
import {
  Modal,
  message,
  Select,
  Button,
  Form,
  Input,
  Tag,
  Pagination,
} from "antd";
import { users } from "../../helper/axios";
import { DeleteFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function InstitutesTable() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [loading, setloading] = useState(false);
  const [addloading, setaddloading] = useState(false);
  const [data, setdata] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowdata, setRowData] = useState();

  const showModal = (row) => {
    setRowData(row);
    setIsModalVisible(true);
  };

  ///////////////////////////////////////

  const clickCancel = () => {
    setIsModalShow(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values) => {
    setaddloading(true);
    values.role = "institutes";
    let token = localStorage.getItem("talbeilm-token");

    users({
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: values,
    })
      .then(() => {
        setaddloading(false);
        setIsModalShow(false);
        form.resetFields();
        message.success("Institute created!");
      })
      .catch(() => {
        setaddloading(false);
        message.error("an error occured please try later");
      });
  };

  const deleteOperation = (id) => {
    let token = localStorage.getItem("talbeilm-token");

    users(`/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        message.success("User Deleted");
        getUsers();
      })
      .catch(() => {
        message.error("an error occured please try later");
      });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Created at",
      selector: (row) => row?.createdAt.split("T")[0],
    },
    {
      name: "is Email Verified",
      selector: (row) =>
        row?.isEmailVerified ? (
          <Tag color="green">Verified</Tag>
        ) : (
          <Tag className="tag-size" color="volcano">
            {" "}
            Not Verified
          </Tag>
        ),
    },

    {
      name: "Delete",
      selector: (row) => (
        <>
          <a onClick={() => deleteOperation(row.id)}>
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

  const getUsers = () => {
    setloading(true);
    let token = localStorage.getItem("talbeilm-token");

    users({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        role: "user",
        page: currentPage,
        limit: perPage,
      },
    })
      .then((res) => {
        console.log(res.data.results, "user");
        setdata(res.data.results);
        setTotalRows(res.data.totalResults);
        setloading(false);
      })
      .catch(() => {
        message.error("an error occured please try later");
        setloading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, [perPage, currentPage, , isModalShow]);

  return (
    <>
      <div>
        <div className="centerinputbtn">
          <h2>users</h2>
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
          footer={null}
          title="Add Institute"
          visible={isModalShow}
          onCancel={clickCancel}
        >
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            value={users}
            onChange={handleChange}
          >
            <Form.Item
              name="name"
              label="Institute Name"
              rules={[
                {
                  required: true,
                  message: "Please input your institute Name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="number"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please input address",
                },
              ]}
            >
              <Input.TextArea showCount maxLength={100} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={addloading}>
                Create Institute
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default InstitutesTable;
