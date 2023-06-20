import React, { useEffect } from 'react';
import { usePermissionsQuery } from "framework/permissions/getAllPermissions";

interface Props {
  selectedDepartment: string;
}

type State = {
  isSubSuperAdmin: boolean;
};

const INITIAlIZE_DATA: State = {
  isSubSuperAdmin: false,
};

const PermissionsTable: React.FC<Props> = ({ selectedDepartment }) => {
  const [state, setState] = React.useState(INITIAlIZE_DATA);
  const { isSubSuperAdmin } = state;
  const { data, error, isLoading } = usePermissionsQuery({});
  let permissions = data?.permissions?.data?.results || [];
  console.log({ permissions })


  const permissionsTypes = [
    "Can Read",
    "Can Write",
    "Can Create",
    "Can Delete",
  ]

  const handleTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Project Permission</th>
          {permissionsTypes.map((permission: any, i: number) => {
            return (
              <th key={"key" + i} className="text-center">
                {permission}
              </th>
            );
          })}
        </tr>
      </thead>
    )
  }


  // this function takes
  const handleTableContent = (element: string) => {
    const rowCheckBoxes = permissions.filter((permission: any) => permission.model === element);
    console.log({ rowCheckBoxes })

    return rowCheckBoxes.map((permission: any) => {
      console.log({ permission })
      return (
        <td className="text-center">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault3"
            checked={isSubSuperAdmin ? true : false}
            onChange={() => { }}
          />
        </td>
      )
    })
    // for (let index = 0; index < rowCheckBoxes.length; index++) {
    //   const element = rowCheckBoxes[index];
    //   console.log({element})
    //   return (
    //       <input
    //         className="form-check-input"
    //         type="checkbox"
    //         value=""
    //         id="flexCheckDefault3"
    //         checked={isSubSuperAdmin? true : false}
    //         onChange={() => { }}
    //       />
    //   )
    // }
  }

  const handleTableRow = () => {
    const mainCategories = permissions.map((permission: any) => permission.model);
    console.log({ mainCategories })

    var uniqueCategories = mainCategories.filter((value: string, index: number, array: string[]) => array.indexOf(value) === index);
    console.log({ uniqueCategories })
    for (let index = 0; index < uniqueCategories.length; index++) {
      const element = uniqueCategories[index];
      console.log({ element })
      return (
        <tr>
          <td className="fw-bold">{element}</td>
          {handleTableContent(element)}
        </tr>
      )
    }




    // for (let index = 0; index < mainCategories.length; index++) {
    //   const element = mainCategories[index];
    //   console.log({ element })
    //   return (
    //     <tr>
    //       <td className="fw-bold">{element}</td>
    //       {handleTableContent(element)}
    //     </tr>
    //   )
    // }
  }







  useEffect(() => {
    if (selectedDepartment === "All") {
      setState({
        ...state,
        isSubSuperAdmin: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartment])


  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

  return (
    <div className="table-responsive">
      <table className="table table-striped custom-table mt-3">
        {handleTableHeader()}
        <tbody>
          {handleTableRow()}
          {/* <tr>
            <td className="fw-bold">Projects</td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault3"
                checked={isSubSuperAdmin? true : false}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault4"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault5"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault6"
                checked={true}
                onChange={() => { }}
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold">Tasks</td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault9"
                checked={isSubSuperAdmin? true : false}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault10"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault11"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault12"
                checked={true}
                onChange={() => { }}
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold">Chat</td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault15"
                checked={isSubSuperAdmin? true : false}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault16"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault17"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault18"
                checked={true}
                onChange={() => { }}
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold">Estimates</td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault21"
                checked={isSubSuperAdmin? true : false}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault22"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault23"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault24"
                checked={true}
                onChange={() => { }}
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold">Invoices</td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault25"
                checked={isSubSuperAdmin? true : false}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault26"
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault27"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault28"
              />
            </td>
          </tr>
          <tr>
            <td className="fw-bold">Timing Sheets</td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault31"
                checked={isSubSuperAdmin? true : false}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault34"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault35"
                checked={true}
                onChange={() => { }}
              />
            </td>
            <td className="text-center">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault36"
                checked={true}
                onChange={() => { }}
              />
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsTable;
