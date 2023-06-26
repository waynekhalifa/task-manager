import FormInputs from 'components/FormInputs';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { IField } from 'types/formFields';
import { IOption } from 'types/option';
import { SelectedProject } from 'types/project';
import { SelectedTask } from 'types/task';

interface Props {
  onClose: any;
  modalHeader: string;
  isAddModal?: boolean;
  isEditModal?: boolean;
  handleModelData: (key: string, value: any) => void;
  selectedProject?: SelectedProject;
  projects?: IOption[];
  SelectedTask?: SelectedTask;
  members: any[];
  groups: any[];
  modelData?: any;
  onCreate?: () => void;
  onUpdate?: () => void;
}

enum ModelKeys {
  NAME = 'name',
  DESCRIPTION = 'description',
  IS_SUBMITTING = 'isSubmitting',
  USER = 'user',
  GROUP = "group",
  PROJECT = 'project',
  TASK_PEIORITY = 'task_priority',
  FILES = "files",
  START_DATE = "start_at",
  END_DATE = "end_at",
}



const TaskModal: React.FC<Props> = ({ onClose, modalHeader, isAddModal,
  isEditModal,
  handleModelData, selectedProject, SelectedTask, projects, members, groups,
  modelData,
  onCreate,
  onUpdate }) => {






  const formFields: IField[] = [
    {
      label: "Select Project",
      type: "select",
      key: ModelKeys.PROJECT,
      value: modelData?.project,
      options: selectedProject ? [{
        label: selectedProject.name!,
        value: selectedProject.id
      }] : projects,
      onChange: (e: any) => handleModelData(ModelKeys.PROJECT, e.target.value),
      placeholder: "Select Project",
      disabled: selectedProject ? true : false,
      hide: selectedProject ? true : false,
    },
    {
      label: "Task Name",
      type: "text",
      key: ModelKeys.NAME,
      value: modelData?.name,
      onChange: (e: any) => handleModelData(ModelKeys.NAME, e.target.value),
      placeholder: "Enter Task Name",
    },

    {
      label: "Description",
      type: "textarea",
      key: ModelKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (e: any) =>
        handleModelData(ModelKeys.DESCRIPTION, e.target.value),
      placeholder: "Enter Description",
    },
    {
      label: "Task Priority",
      type: "select",
      key: ModelKeys.TASK_PEIORITY,
      value: modelData?.task_priority,
      options: [
        {
          label: "High",
          value: "HIGH",
        },
        {
          label: "Medium",
          value: 'MEDIUM',
        },
        {
          label: "Low",
          value: "LOW",
        },
        {
          label: "Critical",
          value: "CRITICAL",
        }
      ],
      onChange: (e: any) => handleModelData(ModelKeys.TASK_PEIORITY, e.target.value),
      placeholder: "Select Task Priority",
      default: {
        label: SelectedTask?.task_priority,
        value: SelectedTask?.task_priority
      }
    },
    {
      label: "Start Date",
      type: "date",
      key: ModelKeys.START_DATE,
      value: modelData?.start_at,
      onChange: (e: any) =>
        handleModelData(ModelKeys.START_DATE, e.target.value),
      placeholder: "Enter Start Date",
    },
    {
      label: "End Date",
      type: "date",
      key: ModelKeys.END_DATE,
      value: modelData?.end_at,
      onChange: (e: any) =>
        handleModelData(ModelKeys.END_DATE, e.target.value),
      placeholder: "Enter End Date",
    },
    {
      label: "Assign Group",
      type: "select",
      key: ModelKeys.GROUP,
      value: modelData?.group,
      onChange: (e: any) => handleModelData(ModelKeys.GROUP, e.target.value),
      options: groups,
      placeholder: "Select Group",
    },
    {
      label: "Assign To",
      type: "select",
      key: ModelKeys.USER,
      value: modelData?.user,
      options: members,
      onChange: (e: any) => handleModelData(ModelKeys.USER, e.target.value),
      placeholder: "Select User",
    }


  ]






  return (
    <Modal show={isAddModal || isEditModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="card-body">
                <FormInputs
                  formFields={formFields}
                />
              </div>
            </div>
          </div>

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
        {isAddModal && <button
          type="button"
          className="btn btn-primary"
          onClick={onCreate}
        >
          Create
        </button>}
        {isEditModal && <button
          type="button"
          className="btn btn-primary"
          onClick={onUpdate}
        >
          Save
        </button>}
      </Modal.Footer>
    </Modal>
  );
}

export default TaskModal;

