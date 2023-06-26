import FormInputs from 'components/FormInputs';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { IField } from 'types/formFields';
import { IOption } from 'types/option';
import { SelectedProject } from 'types/project';
import { checkIfExist } from 'utils/helper';

interface Props {
  onClose: any;
  modalHeader: string;
  isAddModal?: boolean;
  isEditModal?: boolean;
  handleModelData: (key: string, value: any) => void;
  selectedProject: SelectedProject;
  modelData?: any;
  categories: IOption[];
  admins: any[];
  groups?: any[];
  onCreate?: () => void;
  onUpdate?: () => void;
}

enum ModelKeys {
  NAME = "name",
  CATEGORY = "category",
  DESCRIPTION = "description",
  START_DATE = "start_at",
  END_DATE = "end_at",
  ADMIN = "admin",
  GROUP = "group",
  FILE = "file",
  FILES = "files",
}



const ProjectModal: React.FC<Props> = ({
  onClose, modalHeader, isAddModal,
  isEditModal,
  handleModelData, selectedProject,
  modelData,
  categories,
  admins,
  groups,
  onCreate,
  onUpdate
}) => {

  const formFields: IField[] = [
    {
      label: "Project Name",
      type: "text",
      key: ModelKeys.NAME,
      value: isEditModal ? selectedProject.name : modelData?.name,
      onChange: (e: any) => handleModelData(ModelKeys.NAME, e.target.value),
      placeholder: "Enter Project Name",

    },
    {
      label: "Stages",
      type: "select",
      key: ModelKeys.CATEGORY,
      value: isEditModal ? selectedProject.category : modelData?.category,
      onChange: (e: any) => handleModelData(ModelKeys.CATEGORY, e.target.value),
      options: categories,
      placeholder: "Select Category",
    },
    {
      label: "Description",
      type: "textarea",
      key: ModelKeys.DESCRIPTION,
      value: isEditModal ? selectedProject.description : modelData?.description,
      onChange: (e: any) =>
        handleModelData(ModelKeys.DESCRIPTION, e.target.value),
      placeholder: "Enter Description",
    },
    {
      label: "Start Date",
      type: "date",
      key: ModelKeys.START_DATE,
      value: isEditModal ? selectedProject.start_at : modelData?.start_at,
      onChange: (e: any) =>
        handleModelData(ModelKeys.START_DATE, e.target.value),
      placeholder: "Enter Start Date",
    },
    {
      label: "End Date",
      type: "date",
      key: ModelKeys.END_DATE,
      value: isEditModal ? selectedProject.end_at : modelData?.end_at,
      onChange: (e: any) =>
        handleModelData(ModelKeys.END_DATE, e.target.value),
      placeholder: "Enter End Date",
    },
    {
      label: "Project thumbnail",
      type: "file",
      key: ModelKeys.FILES,
      value: isEditModal ? selectedProject.file : modelData?.file,
      onChange: (e: any) => {
        let file: File = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (url) => {
          handleModelData(ModelKeys.FILE, file)
        };
      },
      placeholder: "Enter Thumbnail",
    },
    // {
    //   label: "Assign Group",
    //   type: "select",
    //   key: ModelKeys.GROUP,
    //   value: isEditModal ? selectedProject.group : modelData?.group,
    //   onChange: (e: any) => handleModelData(ModelKeys.GROUP, e.target.value),
    //   options: groups,
    // },
    {
      label: "Assign Members",
      type: "multiselect",
      key: ModelKeys.ADMIN,
      value: modelData?.admin || [],
      options: admins,
      onChange: (e: any) => {
        let selectedUsers: string[] = modelData?.admin || [];
        if (checkIfExist(selectedUsers, e.target.value)) {
          selectedUsers = selectedUsers.filter((user) => user !== e.target.value);
          handleModelData(ModelKeys.ADMIN, selectedUsers);
        }
        else {
          selectedUsers.push(e.target.value);
          handleModelData(ModelKeys.ADMIN, selectedUsers);
        }
      },
      placeholder: "Select Member",
      hide: isEditModal
    },
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

export default ProjectModal;

