import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { Drawer, Button, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_DRAWER } from "../../util/constant/configSystem";

function Modal(props) {
  // const [visible, setVisible] = useState(false);

  const { visible, formContent, title, callBackSubmit } = useSelector(
    (state) => state.drawerReducer
  );

  const dispatch = useDispatch();

  const { resetForm } = useSelector((state) => state.formikReducer);
  const [size, setSize] = useState(0);

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
    //Clear form sau khi tắt drawer
    resetForm();
  };

  useEffect(() => {
    setDrawerSize();
  }, []);

  const setDrawerSize = () => {
    if (window.innerWidth < 1280) {
      setSize(window.innerWidth);
    } else {
      setSize((window.innerWidth / 5) * 2);
    }
  };

  return (
    <>
      <Drawer
        title={title}
        width={size}
        onClose={onClose}
        visible={visible}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
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

export default memo(Modal);
