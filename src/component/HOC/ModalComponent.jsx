import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../util/constant/configSystem";

const ModalComponent = () => {
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const { isModalVisible, modalContent } = useSelector(
    (state) => state.modalReducer
  );

  const { callBackSubmit } = useSelector((state) => state.modalReducer);

  const [state, setState] = useState();

  const handleOk = () => {
    dispatch({ type: CLOSE_MODAL });
    callBackSubmit();
  };

  const handleCancel = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"60vw"}
        bodyStyle={{
          padding: "20px",
          marginRight: "10px",
          overflowY: "scroll",
        }}
        centered
        transitionName=""
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default ModalComponent;
