import React from "react";
import { Row, Col } from "antd";
import bg from "../../assets/img/bg.png";
import { Route } from "react-router-dom";

export default function LoginTemplate(props) {
  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };
  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };
  const { Component, path } = props;

  const inputStyle =
    "border-2 rounded-md p-2 pl-4 w-2/5 border-gray outline-[#0052cc] mt-5";
  return (
    <Route
      exact
      path={path}
      render={(propsRoute) => {
        return (
          <Row className="background grid-col-2 h-screen w-screen">
            <Col span={14} className="h-full w-full">
              <img src={bg} alt="" className="object-cover h-full w-full" />
            </Col>
            <Col span={10}>
              <Component
                exact
                path={path}
                inputStyle={inputStyle}
                {...propsRoute}
              />
            </Col>
          </Row>
        );
      }}
    ></Route>
  );
}
