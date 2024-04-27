import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  AppstoreAddOutlined,

} from "@ant-design/icons";
import "./style.css";
import Product from "../postTable";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../redux/user";
import Footer from "../footer/footer";

const { Content, Sider } = Layout;

export default function LayoutsMain() {
  // const dispatch = useDispatch();
  const [panelId, setpanelId] = useState(1);
const dispatch = useDispatch()

  return (
    <Layout>
      <Sider
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "white",
        }}
      >
        <div className="logo">
          <h1 style={{ color: "black" }}>ISmart</h1>
        </div>
        <Menu mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key={1}
            icon={<AppstoreAddOutlined />}
            onClick={() => setpanelId(1)}
          >
            Plans
          </Menu.Item>
          <Menu.Item
            key={2}
            icon={<UserOutlined />}
            onClick={() => setpanelId(2)}
          >
           Footers
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <div className="backgroundwhole">
          <div className="dashtextdiv">
            <h1 className="dashtext">ISmart</h1>
            <div className="lgodiv">
              <div
                onClick={() => {
                  dispatch(setLoginState(false));
                }}
              >
              <h1 style={{ color: "white", fontSize: " large" }}>
                <UserOutlined style={{ paddingRight: "0.25rem" }} />
                log out
              </h1>
              </div>{" "}
            </div>
          </div>
          {/* <div className="cardsdiv22222">
            <Row justify="space-around" className="cardsdiv3344">
              <Col>
                <Cards />
              </Col>
              <Col>
                <Cards />
              </Col>
              <Col>
                <Cards />
              </Col>
              <Col>
                <Cards />
              </Col>
            </Row>
          </div> */}
        </div>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              textAlign: "center",
              height:"auto"
            }}
          >
            {panelId === 1 && <Product />}
            {panelId === 2 && <Footer />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
