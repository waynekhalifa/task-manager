import React, { useEffect, useMemo, useState } from 'react';
import { usePermissionsQuery } from "framework/permissions/getAllPermissions";
import { useUpdatePermissions, permissionsInput } from 'framework/permissions/updatePermissions';

interface Props {
  isDepartmentAdmin: boolean;
  closeModal: () => void;
  employeeData: any;
}
interface Permission {
  id: number;
  model: string;
  name: string;
  can_read: boolean;
  can_write: boolean;
  can_create: boolean;
  can_delete: boolean;
}

interface CheckedState {
  [key: string]: { [key: string]: boolean };
}

const PermissionsTable: React.FC<Props> = ({ isDepartmentAdmin, closeModal, employeeData }): JSX.Element => {
  const { data, error, isLoading } = usePermissionsQuery({});
  const [checkedState, setCheckedState] = useState<CheckedState>({});
  const [addedPermissions, setAddedPermissions] = useState<number[]>([]);
  const [removedPermissions, setRemovedPermissions] = useState<number[]>([]);
  const { mutateAsync: createMutation } = useUpdatePermissions();

  const permissions: Permission[] = useMemo(() => data?.permissions?.data?.results || [], [data]);
  useEffect(() => {
    const initialCheckedState: CheckedState = {};
    permissions.forEach((permission: Permission) => {
      if (!initialCheckedState[permission.model]) {
        initialCheckedState[permission.model] = {};
      }
      initialCheckedState[permission.model] = {
        ...initialCheckedState[permission.model],
        can_read: false,
        can_write: false,
        can_create: false,
        can_delete: false,
      };
    });

    setCheckedState(initialCheckedState);
  }, [permissions, isDepartmentAdmin]);

  const permissionTypes = [
    { name: "Can Read", key: "can_read" },
    { name: "Can Update", key: "can_write" },
    { name: "Can Create", key: "can_create" },
    { name: "Can Delete", key: "can_delete" },
  ];

  useEffect(() => {
    if (employeeData?.id === undefined) return;
    handlePermissions(employeeData?.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[employeeData])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <></>;
  const handlePermissions = async (id: string | number) => {
    const Data = {
      user: Number(id),
      add: addedPermissions,
      remove: removedPermissions,
    }
    try {
      let createInput = permissionsInput(Data);
      const data = await createMutation(createInput);
      console.log({data})
      closeModal()
    } catch (err) {
      alert(err);
    }
  }

  const compareKeysToPermissions = (key: string, permission: Permission): string => {
    if (key === "can_read") {
      return `Can view ${permission.model}`;
    } else if (key === "can_write") {
      return `Can change ${permission.model}`;
    } else if (key === "can_create") {
      return `Can add ${permission.model}`;
    } else if (key === "can_delete") {
      return `Can delete ${permission.model}`;
    }
    return '';
  };

  const handleCheck = (element: string, key: string, value: boolean): void => {
    // get all permissions for the element
    const selectedPermission = permissions.find((permission: Permission) => permission.model === element);
    if (!selectedPermission) return;
    const permissionKey: string = compareKeysToPermissions(key, selectedPermission);
    
    // filter based on key and permissionKey
    const selectedPermissionId = permissions.find((permission: Permission) => permission.model === element && permission.name === permissionKey)?.id;
    if (!selectedPermissionId) return;

    const isToRemove = addedPermissions.includes(selectedPermissionId); // true if permission is in addedPermissions
    const isToAdd = removedPermissions.includes(selectedPermissionId); // true if permission is in removedPermissions

    if (isToRemove) {
      // remove from addedPermissions
      setAddedPermissions(addedPermissions.filter((permissionId: number) => permissionId !== selectedPermissionId));
      setRemovedPermissions([...removedPermissions, selectedPermissionId])
    } else if (isToAdd) {
      // remove from removedPermissions
      setRemovedPermissions(removedPermissions.filter((permissionId: number) => permissionId !== selectedPermissionId));
      setAddedPermissions([...addedPermissions, selectedPermissionId])
    } else if (!isToRemove && !isToAdd && value) { 
      // add to addedPermissions
      setAddedPermissions([...addedPermissions, selectedPermissionId])
    }
  };
  console.log({addedPermissions, removedPermissions})

  const handleTableHeader = (): JSX.Element => {
    return (
      <thead>
        <tr>
          <th>Project Permission</th>
          {permissionTypes.map((permissionType, i) => (
            <th key={`header-${i}`} className="text-center">
              {permissionType.name}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const handleTableContent = (element: string): JSX.Element[] => {
    return permissionTypes.map((permissionType, i) => {
      const isChecked = checkedState[element]?.[permissionType.key] || isDepartmentAdmin;
      return (
        <td key={`content-${i}`} className="text-center">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id={`flexCheckDefault${i}`}
            checked={isChecked}
            onChange={() => {
              const newCheckedState: CheckedState = {
                ...checkedState,
                [element]: {
                  ...checkedState[element],
                  [permissionType.key]: !checkedState[element]?.[permissionType.key],
                },
              };
              setCheckedState(newCheckedState);
              handleCheck(element, permissionType.key, !checkedState[element]?.[permissionType.key]);

            }}
          />
        </td>
      );
    });
  };

  const handleTableRow = (): JSX.Element[] => {
    const mainCategories = [...new Set(permissions.map((permission: any) => permission.model))];
    return mainCategories.map((element: string, i) => (
      <tr key={`row-${i}`}>
        <td className="fw-bold">{element}</td>
        {handleTableContent(element)}
      </tr>
    ));
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped custom-table mt-3">
        {handleTableHeader()}
        <tbody>{handleTableRow()}</tbody>
      </table>
    </div>
  );
};

export default PermissionsTable;