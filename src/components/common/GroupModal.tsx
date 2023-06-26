import FormInputs from 'components/FormInputs';
import { usePermissionsQuery } from 'framework/permissions/getAllPermissions';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { IField } from 'types/formFields';
import { IOption } from 'types/option';
import { CustomPermission, Permission } from 'types/permission';
import { checkIfExist } from 'utils/helper';

interface Props {
  handleModelData: (key: string, value: any) => void;
  onClose: () => void;
  modelData: any;
  show: boolean;
  users: IOption[];
  onCreate?: () => void;
  onUpdate?: () => void;
  isEdit?: boolean;
  header: string;
}

enum ModelKeys {
  NAME = "name",
  DESCRIPTION = "description",
  USERS = "users",
  PERMISSIONS = "permissions",
}


const GroupModal: React.FC<Props> = ({
  handleModelData,
  onClose,
  onCreate,
  modelData,
  onUpdate,
  show,
  users,
  header,
  isEdit,
}) => {
  const { data, error, isLoading } = usePermissionsQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  const permissions: Permission[] = data?.permissions?.data?.results || [];



  const formFields: IField[] = [
    {
      label: "Name",
      type: "text",
      key: ModelKeys.NAME,
      value: modelData?.name,
      onChange: (e: any) => handleModelData(ModelKeys.NAME, e.target.value),
      placeholder: "Enter Group Name",
    },

    {
      label: "Members",
      type: "multiselect",
      key: ModelKeys.USERS,
      value: modelData?.users || [],
      options: users,
      onChange: (e: any) => {
        let selectedUsers: string[] = modelData?.users || [];
        if (checkIfExist(selectedUsers, e.target.value)) {
          selectedUsers = selectedUsers.filter((user) => user !== e.target.value);
          handleModelData(ModelKeys.USERS, selectedUsers);
        }
        else {
          selectedUsers.push(e.target.value);
          handleModelData(ModelKeys.USERS, selectedUsers);
        }
      },
      placeholder: "Select Member",
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: ModelKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (e: any) =>
        handleModelData(ModelKeys.DESCRIPTION, e.target.value),
      placeholder: "Enter Description",
    },
  ]



  const checkReadPermission = (permission: Permission): Permission | null => {
    switch (permission.codename) {
      case "view_project":
        return permission;
      case "view_task":
        return permission;
      case "view_user":
        return permission;
      default:
        return null;
    }
  };
  const getReadPermission = (permissions: Permission[]): Permission | null => {
    return permissions.find((permission) => checkReadPermission(permission)) || null;
  };
  const handleTable = (): JSX.Element => {
    let CustomizedPermissions: CustomPermission[] = [];
    permissions.forEach((permission) => {
      let current = CustomizedPermissions.find(
        (customizedPermission) =>
          customizedPermission.header === permission.model
      );
      if (!current) {
        CustomizedPermissions.push({
          header: permission.model,
          children: permissions.filter(
            (child) => child.model === permission.model
          ),
        });
      }
    });

    return (
      <table className="table table-striped custom-table mt-3">
        <thead>
          <tr>
            <th>Permissions</th>
            <th className="text-center">Read</th>
            <th className="text-center">Create</th>
            <th className="text-center">Update</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {CustomizedPermissions.map((customizedPermission, i) => (
            <tr key={`tr-${i}`}>
              <td>{customizedPermission.header}</td>
              {customizedPermission.children.reverse().map((permission, i) => (
                <td key={permission.id} className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={modelData?.permissions?.includes(permission.id)}
                    onChange={(e: any) => {
                      let userPermissions: number[] = modelData?.permissions || [];
                      if (e.target.checked) {
                        if (!checkReadPermission(permission)) {
                          const readPermission = getReadPermission(customizedPermission.children);
                          userPermissions?.push(readPermission?.id!);
                        }
                        userPermissions?.push(permission?.id!);
                      } else {
                        userPermissions = userPermissions?.filter(
                          (permissionId) => permissionId !== permission.id
                        );
                      }
                      handleModelData(ModelKeys.PERMISSIONS, userPermissions)
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }


  return (
    <Modal
      centered
      show={show}
      size="lg"
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          <FormInputs formFields={formFields} grid={true} />
          <div className="table-responsive">
            {handleTable()}
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
        <button type="button" className="btn btn-primary"
          onClick={isEdit? onUpdate : onCreate}
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </Modal.Footer>
    </Modal>
  )
}


export default GroupModal;