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
  projects?: SelectedProject[];
  SelectedTask?: SelectedTask;
  members: any[];
  modelData?: any;
  onCreate: () => void;
  onUpdate: () => void;
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



const TaskModal: React.FC<Props> = ({ onClose, modalHeader, isAddModal,
  isEditModal,
  handleModelData, selectedProject, SelectedTask, projects,members,
  modelData,
  onCreate,
  onUpdate }) => {

  let projectOptions: IOption[] = (projects && projects.length > 0) ? projects?.map((project: SelectedProject) => {
    return {
      label: project.name || "",
      value: project.id || 0,
    };
  }) : [
    {
      label: selectedProject?.name || "",
      value: selectedProject?.id || 0,
    }
  ]


  const formFields: IField[] = [
    {
      label: "Select Project",
      type: "select",
      key: ModelKeys.PROJECT,
      value: isEditModal ? SelectedTask?.project : projectOptions[0],
      options: projectOptions,
      onChange: (e: any) => handleModelData(ModelKeys.PROJECT, e.target.value),
      placeholder: "Select Project",
      disabled: selectedProject ? true : false,
    },
    {
      label: "Task Name",
      type: "text",
      key: ModelKeys.NAME,
      value: isEditModal ? SelectedTask?.name : modelData?.name,
      onChange: (e: any) => handleModelData(ModelKeys.NAME, e.target.value),
      placeholder: "Enter Task Name",
    },

    {
      label: "Description",
      type: "textarea",
      key: ModelKeys.DESCRIPTION,
      value: isEditModal ? SelectedTask?.description : modelData?.description,
      onChange: (e: any) =>
        handleModelData(ModelKeys.DESCRIPTION, e.target.value),
      placeholder: "Enter Description",
    },

    {
      label: "Task thumbnail",
      type: "file",
      key: ModelKeys.FILES,
      value: isEditModal ? SelectedTask?.files : modelData?.file,
      onChange: (e: any) => {
        let file: File = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (url) => {
          handleModelData(ModelKeys.FILES, file)
        };
      },
      placeholder: "Enter Thumbnail",
      hide: isEditModal
    },
    {
      label: "Task Priority",
      type: "select",
      key: ModelKeys.TASK_PEIORITY,
      value: isEditModal ? SelectedTask?.task_priority : modelData?.task_priority,
      options: [
        {
          label: "Low",
          value: "low",
        },
        {
          label: "Medium",
          value: "medium",
        },
        {
          label: "High",
          value: "high",
        },
      ],
      onChange: (e: any) => handleModelData(ModelKeys.TASK_PEIORITY, e.target.value),
      placeholder: "Select Task Priority",
    },
    {
      label: "Assign To",
      type: "select",
      key: ModelKeys.USER,
      value: isEditModal ? SelectedTask?.user : modelData?.user,
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

