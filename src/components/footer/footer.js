import React, { useState, useEffect } from "react";
import "./style.css";
import DataTable from "react-data-table-component";
import { Modal, message, Button, Form, Input, Card, Pagination } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { footer } from "../../helper/axios";
import TextArea from "antd/es/input/TextArea";

function Footer() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const [perPage, setPerPage] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const [rowdata, setRowData] = useState();
  const [loadingedit, setLoadingEdit] = useState(false);
  const [names, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [link, setLink] = useState("");

  const showModal = (row) => {
    setRowData(row);
    setName(row?.name);
    setSvg(row?.svg);
    setLink(row?.link);
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

  const handleUpdate = (item) => {
    setLoadingEdit(true);
    let data = {
      name: item.name,
      svg: item.svg,
      link: item.link,
    };

    footer(`/${item.id}`, {
      method: "put",
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
        getFooter();
        setIsModalVisible(false);
      });
  };

  const deleteFooter = (id) => {
    footer(`/${id}`, {
      method: "delete",
    })
      .then(() => {
        message.success("Footer Deleted");
        getFooter();
      })
      .catch(() => {
        message.error("an error occured please try later");
      });
  };

  const onFinish = (values) => {
    console.log(values);
    setloading(true);

    footer({
      method: "post",
      data: {
        name: values?.name,
        svg: values?.svg,
        link: values?.link,
      },
    })
      .then(() => {
        setloading(false);
        setIsModalShow(false);
        form.resetFields();
        message.success("footer created!");
      })
      .catch(() => {
        setloading(false);
        message.error("an error occured please try later");
      });
  };

  const getFooter = () => {
    setloading(true);

    footer({
      method: "get",
      params: {
        page: currentPage,
        limit: perPage,
      },
    })
      .then((res) => {
        setdata(res.data);
        setloading(false);
      })
      .catch(() => {
        message.error("an error occured please try later");
        setloading(false);
      });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
    },

    {
      name: "Svg",
      selector: (row) => (
        <a href={row?.link}>
          <img src={row?.svg} alt="abc" style={{ width: "2rem" }} />
        </a>
      ),
    },
    {
      name: "Link",
      selector: (row) => (
        <a style={{ color: "black" }} href={row?.link}>
          {row?.link}
        </a>
      ),
    },

    {
      name: "Edit",
      selector: (row) => (
        <button className="edit" color="lime" onClick={() => showModal(row)}>
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <>
          <a   onClick={() => deleteFooter(row._id)}>
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
    getFooter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage, currentPage, isModalShow]);
  console.log(data, "footer");
  return (
    <>
      <div>
        <div className="centerinputbtn">
          <h2>Footer</h2>
          <div className="price-div">
            <div className="institutebtn">
              <button onClick={addModal} className="create-button">
                Add Footer
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
          total={data.length}
          defaultPageSize={perPage}
          current={currentPage}
          onChange={handlePageChange}
          style={{ marginTop: "1rem" }}
        />
        <Modal
          title="Edit Footer"
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
                    handleUpdate({
                      name: names,
                      svg: svg,
                      link: link,
                      id: rowdata._id,
                    });
                  }}
                  loading={loadingedit}
                >
                  Update
                </Button>
              </div>
            ]}
          >
            <div className=" div-flex">
              <div>
                <h4>name</h4>
                <Input
                  value={names}
                  className="input-updatess"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="divspacer">
                <h4>svgs</h4>
                <TextArea
                rows={4}
                  value={svg}
                  className="input-updatess"
                  onChange={(e) => setSvg(e.target.value)}
                />
              </div>
            </div>
            <div className="dispaly-flex">
              <div className="divspacer">
                <h4>link</h4>
                <TextArea
                rows={4}
                  value={link}
                  className="input-updatess"
                  onChange={(e) => setLink(e.target.value)}
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
              name="name"
              label="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="svg"
              label="svg"
              rules={[
                {
                  required: true,
                  message: "Please input your svg!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="link"
              label="link"
              rules={[
                {
                  required: true,
                  message: "Please input link",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <div className="form-item">
                <Button
                  className="form-Button"
                  htmlType="submit"
                  loading={loading}
                >
                  Create Footer
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default Footer;
