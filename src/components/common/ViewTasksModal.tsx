import { useTaskQuery } from 'framework/task/get-all-tasks';
import useApp from 'hooks/useApp';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { SelectedProject } from 'types/project';
import { SelectedTask } from 'types/task';
import { getBadge } from 'utils/helper';

interface Props {
  onClose: any;
  show: any;
  modalHeader: string;
  project: SelectedProject;
}



const ViewTasksModal: React.FC<Props> = ({ onClose, show, modalHeader, project }) => {
  const { push } = useApp();
  let query = '';
  if (project.id) query = `?project=${project.id}`;
  const {
    data: tasksData,
    error: errorsTask,
    isLoading: loadingTasks,
  } = useTaskQuery({ query });

  if (loadingTasks) return <div>Loading...</div>;
  if (errorsTask) return null;

  const tasks: SelectedTask[] = tasksData?.tasks?.data?.results || [] as SelectedTask[];



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
            <p className=" ms-2 text-dark"
              style={{ cursor: 'pointer' }}
              onClick={() => push(`/dashboard/tasks/${task.id}`)}
            ><strong>{task.name}</strong></p>
            <p className={getBadge(task?.task_progress!) + " ms-2"}>{task.task_progress}</p>

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

