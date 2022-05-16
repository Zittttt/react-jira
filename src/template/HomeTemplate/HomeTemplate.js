import React, { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import HeaderHome from "./HeaderHome";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export default function HomeTemplate(props) {
  const { Component, path } = props;

  const [state, setState] = useState({ collapsed: false });

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setState({
      collapsed,
    });
  };

  const { collapsed } = state;

  console.log(collapsed);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <HeaderHome />
        <Route
          exact
          path={path}
          render={(propsRoute) => {
            return (
              <Fragment>
                <Component exact path={path} {...propsRoute} />;
              </Fragment>
            );
          }}
        ></Route>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>

    // <Route
    //   exact
    //   path={path}
    //   render={(propsRoute) => {
    //     return (
    //       <Fragment>
    //         <HeaderHome></HeaderHome>
    //         <Component exact path={path} {...propsRoute} />;
    //       </Fragment>
    //     );
    //   }}
    // ></Route>
  );
}
