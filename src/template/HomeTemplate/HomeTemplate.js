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
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
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
  const [state, setState] = useState({ collapsed: true });
  const [siderWidth, setSiderWidth] = useState(
    "mobile:w-[50px] mobile:min-w-[50px] mobile:max-w-[50px]"
  );

  const history = useHistory();
  useEffect(() => {
    dispatch(testTokenAction(history));
  }, []);

  const { Sider } = Layout;

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
    if (collapsed) {
      setSiderWidth("mobile:w-[50px] mobile:min-w-[50px] mobile:max-w-[50px]");
    } else {
      setSiderWidth("w-[200px] min-w-[200px] max-w-[200px]");
      console.log(siderWidth);
    }
    setState({
      collapsed,
    });
  };

  const { collapsed } = state;

  return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "#fff",
          maxWidth: "100vw",
        }}
        className="pt-8 pl-32 pr-12 mobile:pl-14 mobile:pr-2"
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className={`fixed top-0 left-0 h-full z-10 ${siderWidth}`}
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
        {/* <Menu
          mode="horizontal"
          defaultSelectedKeys={["mail"]}
          className="fixed top-0 bg-secondary-500"
        >
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Navigation One
          </Menu.Item>
          <Menu.SubMenu
            key="SubMenu"
            title="Navigation Two - Submenu"
            icon={<SettingOutlined />}
          >
            <Menu.Item key="two" icon={<AppstoreOutlined />}>
              Navigation Two
            </Menu.Item>
            <Menu.Item key="three" icon={<AppstoreOutlined />}>
              Navigation Three
            </Menu.Item>
            <Menu.ItemGroup title="Item Group">
              <Menu.Item key="four" icon={<AppstoreOutlined />}>
                Navigation Four
              </Menu.Item>
              <Menu.Item key="five" icon={<AppstoreOutlined />}>
                Navigation Five
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu> */}
        <Layout className="site-layout bg-white w-full">
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
