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
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "../../util/config";
import { testTokenAction } from "../../redux/actions/testTokenAction";
import {
  NOTIFICATION_ICON,
  SHOW_NOTIFICATION,
} from "../../util/constant/configSystem";

export default function HomeTemplate(props) {
  const dispatch = useDispatch();
  const { Component, path } = props;
  const [state, setState] = useState({ collapsed: false });

  const history = useHistory();
  useEffect(() => {
    dispatch(testTokenAction(history));
  }, []);

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
      [getItem("Profile", "profile"), getItem("Log out", "logOut")]
    ),
  ];

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setState({
      collapsed,
    });
  };

  const { collapsed } = state;

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
            className="account"
            onClick={(e) => {
              if (e.key === "logOut") {
                localStorage.removeItem(TOKEN);
                history.push("/login");
                dispatch({
                  type: SHOW_NOTIFICATION,
                  value: {
                    message: "Logged out!",
                    description: "",
                    type: NOTIFICATION_ICON.INFO,
                  },
                });
              } else {
                history.push(e.key);
              }
            }}
          />
        </Sider>
        <Layout className="site-layout p-10 bg-white">
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
        </Layout>
      </Layout>
    </div>
  );
}
