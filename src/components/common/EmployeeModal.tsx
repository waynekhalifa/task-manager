import FormInputs from 'components/FormInputs';
import { usePermissionsQuery } from 'framework/permissions/getAllPermissions';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Category } from 'types/category';
import { IField } from 'types/formFields';
import { CustomPermission, Permission } from 'types/permission';

interface Props {
  handleModelData: (key: string, value: any) => void;
  onClose: () => void;
  modelData: any;
  show: boolean;
  departments: Category[];
  managers: any[];
  onCreate: () => void;
  header: string;
  isManager?: boolean;
}

enum ModelKeys {
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD1 = "password1",
  ONBOARD_AT = "onboard_at",
  EMPLOYEE_ID = "employee_id",
  PHONE = "phone",
  DEPARTMENT = "department",
  FILES = "files",
  DESCRIPTION = "description",
  MANAGER = "manager",
  USER_PERMISSIONS = "user_permissions",
}


const EmployeeModal: React.FC<Props> = ({
  handleModelData,
  onClose,
  onCreate,
  modelData,
  show,
  departments,
  managers,
  header,
  isManager
}) => {
  const { data, error, isLoading } = usePermissionsQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
  const permissions: Permission[] = data?.permissions?.data?.results || [];



  const formFields: IField[] = [
    {
      label: "First Name",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.FIRST_NAME,
      value: modelData?.first_name,
      onChange: (e: any) => handleModelData(ModelKeys.FIRST_NAME, e.target.value),
      placeholder: "Enter First Name",
    },
    {
      label: "Last Name",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.FIRST_NAME,
      value: modelData?.last_name,
      onChange: (e: any) => handleModelData(ModelKeys.LAST_NAME, e.target.value),
      placeholder: "Enter Last Name",
    },
    {
      label: "Employee ID",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.EMPLOYEE_ID,
      value: modelData?.employee_id,
      onChange: (e: any) => handleModelData(ModelKeys.EMPLOYEE_ID, e.target.value),
      placeholder: "Employee ID",
    },
    {
      label: "Joining Date",
      type: "date",
      width: "col-md-6",
      key: ModelKeys.ONBOARD_AT,
      value: modelData?.onboard_at,
      onChange: (e: any) =>
        handleModelData(ModelKeys.ONBOARD_AT, e.target.value),
      placeholder: "Enter Start Date",
    },
    {
      label: "Employee User Name",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.USERNAME,
      value: modelData?.username,
      onChange: (e: any) => handleModelData(ModelKeys.USERNAME, e.target.value),
      placeholder: "User Name",
    },
    {
      label: "Password",
      type: "password",
      width: "col-md-6",
      key: ModelKeys.PASSWORD1,
      value: modelData?.password1,
      onChange: (e: any) => handleModelData(ModelKeys.PASSWORD1, e.target.value),
      placeholder: "Password",
    },
    {
      label: "Email",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.EMAIL,
      value: modelData?.email,
      onChange: (e: any) => handleModelData(ModelKeys.EMAIL, e.target.value),
      placeholder: "Email",
    },
    {
      label: "Phone Number",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.PHONE,
      value: modelData?.phone,
      onChange: (e: any) => handleModelData(ModelKeys.PHONE, e.target.value),
      placeholder: "Phone Number",
    },
    {
      label: "Department",
      type: "select",
      width: "col-md-12",
      key: ModelKeys.DEPARTMENT,
      value: modelData?.department?.value,
      onChange: (e: any) => handleModelData(ModelKeys.DEPARTMENT, e.target.value),
      options: departments.map((department: Category) => ({
        label: department.name,
        value: department.id,
      })).concat({ label: "Select Department", value: 0 }).reverse(),
      placeholder: "Select Department",
    },
    {
      label: "His Manager",
      type: "select",
      key: ModelKeys.MANAGER,
      value: modelData?.manager,
      options: managers.map((manager) => ({
        label: manager.label,
        value: manager.value,
      })),
      onChange: (e: any) => handleModelData(ModelKeys.MANAGER, e.target.value),
      placeholder: "Select Manager",
      hide: isManager
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
                    checked={modelData?.user_permissions?.includes(permission.id)}
                    onChange={(e: any) => {
                      let userPermissions: number[] = modelData?.user_permissions || [];
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
                      handleModelData(ModelKeys.USER_PERMISSIONS, userPermissions)
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
          onClick={onCreate}
        >
          Create
        </button>
      </Modal.Footer>
    </Modal>
  )
}


export default EmployeeModal;