import React from 'react';
import { Modal } from 'react-bootstrap';

interface Props {
  onClose: any;
  show: any;
  modalHeader: string;
}

enum ModelKeys {
  NAME = 'name',
  DESCRIPTION = 'description',
  FILES = 'files',
  IS_SUBMITTING = 'isSubmitting',
  USER = 'user',
  PROJECT = 'project',
  TASK_PEIORITY = 'task_priority',
}

interface State {
  modelData: {
    [ModelKeys.NAME]: string;
    [ModelKeys.DESCRIPTION]: string;
    [ModelKeys.FILES]: any[];
    [ModelKeys.IS_SUBMITTING]: boolean;
    [ModelKeys.USER]: any;
    [ModelKeys.PROJECT]: any;
    [ModelKeys.TASK_PEIORITY]: string;
  };
}

const INITIAlIZE_DATA: State = {
  modelData: {
    [ModelKeys.NAME]: '',
    [ModelKeys.DESCRIPTION]: '',
    [ModelKeys.FILES]: [] as any[],
    [ModelKeys.IS_SUBMITTING]: false,
    [ModelKeys.USER]: null,
    [ModelKeys.PROJECT]: null,
    [ModelKeys.TASK_PEIORITY]: '',
  },
};


const TaskModal: React.FC<Props> = ({ onClose, show, modalHeader }) => {
  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { modelData } = state;

  return (
    <Modal
      show={show}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput77" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput77"
            placeholder="Explain what the Project Name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Task Category</label>
          <select className="form-select">
            <option>Curriculum Development</option>
            <option value="1">Technology Integration</option>
            <option value="2">Teacher Training</option>
            <option value="3">Assessment System</option>
            <option value="4">Student Records</option>
            <option value="5">Inclusive Education</option>
            <option value="6">Technology Integration</option>
            <option value="7">Educational Field Trips</option>
            <option value="8">Parental Involvement</option>
            <option value="9">Parental Feedback</option>
            <option value="10">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="formFileMultipleone" className="form-label">
            Task Images &amp; Document
          </label>
          <input
            className="form-control"
            type="file"
            id="formFileMultipleone"
            multiple={false}
          />
        </div>
        <div className="deadline-form">
          <form>
            <div className="row g-3 mb-3">
              <div className="col">
                <label htmlFor="datepickerded" className="form-label">
                  Task Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="datepickerded"
                />
              </div>
              <div className="col">
                <label htmlFor="datepickerdedone" className="form-label">
                  Task End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="datepickerdedone"
                />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-sm-12">
                <label className="form-label">Notifation Sent</label>
                <select className="form-select">
                  <option>All</option>
                  <option value="1">Team Leader Only</option>
                  <option value="2">Team Member Only</option>
                </select>
              </div>
              <div className="col-sm-12">
                <label htmlFor="formFileMultipleone" className="form-label">
                  Task Assign Person
                </label>
                <select className="form-select" multiple={false}>
                  <option>Lucinda Massey</option>
                  <option value="1">Ryan Nolan</option>
                  <option value="2">Oliver Black</option>
                  <option value="3">Adam Walker</option>
                  <option value="4">Brian Skinner</option>
                  <option value="5">Dan Short</option>
                  <option value="5">Jack Glover</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="row g-3 mb-3">
          <div className="col-sm">
            <label htmlFor="formFileMultipleone" className="form-label">
              Budget
            </label>
            <input type="number" className="form-control" />
          </div>
          <div className="col-sm">
            <label htmlFor="formFileMultipleone" className="form-label">
              Priority
            </label>
            <select className="form-select">
              <option>Highest</option>
              <option value="1">Medium</option>
              <option value="2">Low</option>
              <option value="3">Lowest</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea78"
            className="form-label"
          >
            Description (optional)
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea78"
            rows={3}
            placeholder="Add any extra details about the request"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-primary">
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default TaskModal;

