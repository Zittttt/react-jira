import React, { useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER, OPEN_DRAWER } from "../../util/constant/configSystem";

const { Option } = Select;

export default function Modal() {
  // const [visible, setVisible] = useState(false);

  const { visible, formContent, callBackSubmit } = useSelector(
    (state) => state.drawerReducer
  );
  const dispatch = useDispatch();

  console.log(visible);

  const showDrawer = () => {
    dispatch({
      type: OPEN_DRAWER,
    });
    // setVisible(true);
  };

  const onClose = () => {
    // setVisible(false);
    dispatch({
      type: CLOSE_DRAWER,
    });
  };
  return (
    <>
      <Drawer
        title="Project IDxxxx"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {formContent}
      </Drawer>
    </>
  );
}
