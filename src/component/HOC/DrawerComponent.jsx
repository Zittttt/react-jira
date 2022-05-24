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

  const { visible, formContent, callBackSubmit, title } = useSelector(
    (state) => state.drawerReducer
  );
  const dispatch = useDispatch();

  const onClose = () => {
    // setVisible(false);
    dispatch({
      type: CLOSE_DRAWER,
    });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              form="editProjectForm"
              key="submit"
              htmlType="submit"
              type="primary"
              onClick={() => {
                callBackSubmit();
              }}
            >
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
