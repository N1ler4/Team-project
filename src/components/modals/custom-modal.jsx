import React from "react";
import { Modal } from "antd";

const CustomModal = ({
  title,
  isModalOpen,
  handleCancel,
  children,
}) => {

  return (
    <Modal title={title} open={isModalOpen} onCancel={handleCancel} footer={[]}>
      {children}
    </Modal>
  );
};

export default CustomModal;
