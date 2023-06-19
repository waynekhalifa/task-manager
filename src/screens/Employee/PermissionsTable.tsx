import React, { useEffect, useMemo, useState } from 'react';
import { usePermissionsQuery } from "framework/permissions/getAllPermissions";

interface Props {
  isDepartmentAdmin: boolean;
}

interface Permission {
  id: number;
  model: string;
  can_read: boolean;
  can_write: boolean;
  can_create: boolean;
  can_delete: boolean;
}

interface CheckedState {
  [key: string]: { [key: string]: boolean };
}

const PermissionsTable: React.FC<Props> = ({ isDepartmentAdmin }): JSX.Element => {
  const { data, error, isLoading } = usePermissionsQuery({});
  const [checkedState, setCheckedState] = useState<CheckedState>({});
  const permissions: Permission[] = useMemo(() => data?.permissions?.data?.results || [], [data]);

  useEffect(() => {
    const initialCheckedState: CheckedState = {};
    console.log('from child', isDepartmentAdmin)
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <></>;

  const permissionTypes = [
    { name: "Can Read", key: "can_read" },
    { name: "Can Write", key: "can_write" },
    { name: "Can Create", key: "can_create" },
    { name: "Can Delete", key: "can_delete" },
  ];

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