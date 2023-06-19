import { Modal } from "react-bootstrap";


interface Props {
  onClose: any;
  show: any;
  data: any;
}

const DescriptionViewModal: React.FC<Props> = ({ onClose, show, data }) => {
  return (
    <Modal centered size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Project Description</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* view project description here  */}
        <div className="project-description">
          <p>{data}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DescriptionViewModal;
