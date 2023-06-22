import React from 'react';
import { Modal } from 'react-bootstrap';
import { SelectedTask } from 'types/task';

interface Props {
  onClose: any;
  show: any;
  modalHeader: string;
  tasks: SelectedTask[];
}



const ViewTasksModal: React.FC<Props> = ({ onClose, show, modalHeader, tasks }) => {

  return (
    <Modal
      show={show}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tasks.map((task, index: number) => (
          <div className="d-flex justify-content-between" key={index}>
            <p className="badge bg-light ms-2 text-dark">{task.name}</p>
            <p className="badge bg-secondary ms-2">{task.task_progress}</p>

            <div
              className="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className="btn btn-outline-secondary"
              // onClick={han}
              >
                <i className="icofont-edit text-success"></i>
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
              // onClick={onClickDelete}
              >
                <i className="icofont-ui-delete text-danger"></i>
              </button>
            </div>

          </div>

        ))}
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

