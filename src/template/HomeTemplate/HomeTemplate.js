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

  const account = useSelector(
    (rootReducer) => rootReducer.userReducer.userLogin
  );

  const avatar = account.avatar;
  const name = account.name;

  const items = [
    getItem("Project", "project", <PieChartOutlined />, [
      getItem("Project Management", ""),
      getItem("Create Project", "/createproject"),
    ]),
    getItem("User", "/user", <UserOutlined />),
    getItem(
      name,
      "Profile",
      <img
        src={avatar}
        className="w-[35px] rounded-full h-[35px] user-image"
      />,
      [getItem("Profile", "/profile"), getItem("Log out", "logOut")]
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
      <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className="relative"
        >
          <div className="sticky top-0 left-0">
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
          </div>
        </Sider>
        <Layout className="site-layout bg-white container">
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
