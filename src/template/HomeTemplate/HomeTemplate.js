import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, Route, useHistory } from "react-router-dom";
import HeaderHome from "./HeaderHome";
import ProjectManagement from "../../pages/ProjectManagement/ProjectManagement";

import logo from "../../assets/img/logo.png";

import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LOGIN } from "../../redux/types/userType";
import useSelection from "antd/lib/table/hooks/useSelection";
import { useSelector } from "react-redux";

export default function HomeTemplate(props) {
  const { Component, path } = props;
  const [state, setState] = useState({ collapsed: false });

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

  const account = useSelector(
    (rootReducer) => rootReducer.userReducer.userLogin
  );
  const avatar = account.avatar;
  const name = account.name;

  const profile = [
    getItem(
      name,
      "User",
      <img src={avatar} className="w-[35px] rounded-full h-[35px]" />,
      [getItem("Profile", "profile"), getItem("Log out", "/logout")]
    ),
  ];

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
          className="pt-2 relative"
        >
          <NavLink to={"/"} className="logo flex justify-center py-10">
            <img src={logo} width={"50px"} />
          </NavLink>
          <Menu
            theme="dark"
            defaultSelectedKeys={[""]}
            mode="inline"
            items={items}
            className="pt-2"
            onClick={(e) => {
              history.push(e.key);
            }}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={[""]}
            mode="inline"
            items={profile}
            className="absolute bottom-0 w-full account"
            onClick={(e) => {
              history.push(e.key);
            }}
          />
          {/* <button className="w-full absolute bottom-0 flex justify-center py-10">
            <img src={logo} width={"50px"} />
          </button> */}
        </Sider>
        <Layout className="site-layout m-10">
          {/* <HeaderHome /> */}
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
