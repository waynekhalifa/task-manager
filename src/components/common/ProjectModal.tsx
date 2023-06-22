import FormInputs from 'components/FormInputs';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { CategoryUpdateInput } from 'types/category';
import { IField } from 'types/formFields';
import { SelectedProject } from 'types/project';

interface Props {
  onClose: any;
  modalHeader: string;
  isAddModal?: boolean;
  isEditModal?: boolean;
  handleModelData: (key: string, value: any) => void;
  selectedProject: SelectedProject;
  modelData?: any;
  categories: CategoryUpdateInput[];
  admins: any[];
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
      options: categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
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
      hide: isEditModal
    },
    {
      label: "Assign Admin",
      type: "select",
      key: ModelKeys.ADMIN,
      value: isEditModal ? selectedProject.admin : modelData?.admin,
      onChange: (e: any) => handleModelData(ModelKeys.ADMIN, e.target.value),
      options: admins.map((admin) => ({
        label: admin.label,
        value: admin.value,
      })),
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

