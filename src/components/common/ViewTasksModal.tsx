import React from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  onClose: any;
  show: any;
  modalHeader: string;
}

 

const ViewTasksModal: React.FC<Props> = ({ onClose, show,modalHeader }) => {
   
  return (
    <Modal
      show={show}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       All tasks will be displayed here
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
        >
          Close
        </button>
         
      </Modal.Footer>
    </Modal>
  );
}

export default ViewTasksModal;

