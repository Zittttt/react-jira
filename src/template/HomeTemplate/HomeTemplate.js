import React, { Fragment, useEffect, useState } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import HeaderHome from "./HeaderHome";
import ProjectManagement from "../../pages/ProjectManagement/ProjectManagement";

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
  getItem("Project", "project", <PieChartOutlined />, [
    getItem("Project Management", ""),
    getItem("Create Project", "/createproject"),
  ]),
  getItem("User", "/user", <UserOutlined />),
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

  const history = useHistory();

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className="pt-16"
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={(e) => {
              history.push(e.key);
            }}
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
                  <Component exact path={path} {...propsRoute} />
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
    </div>

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
