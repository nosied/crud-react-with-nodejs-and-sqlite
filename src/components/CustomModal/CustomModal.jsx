import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Icon from "react-bootstrap-icons";
export const CustomModal = ({
  show,
  handleCloseModal,
  title,
  closeButtonTitle,
  actionButtonTitle,
  actionButton,
  message,
}) => {
  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          <Icon.X size={20} /> {closeButtonTitle}
        </Button>
        <Button variant="danger" onClick={actionButton}>
          <Icon.Trash2Fill size={15} /> {actionButtonTitle}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
