import React, { memo } from "react";
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

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
    //Clear form sau khi tắt drawer
    resetForm();
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
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
