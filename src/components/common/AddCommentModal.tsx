import { Modal } from "react-bootstrap";


interface Props {
  onClose: any;
  show: any;
}

const AddCommentModal: React.FC<Props> = ({ onClose, show }) => {
  return (
    <Modal centered size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Add New Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* view project description here  */}
        Add Comment form will be here
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
        <button className="btn btn-primary" onClick={onClose}>
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCommentModal;
