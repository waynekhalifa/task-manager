import React, { useMemo, useState } from "react";
import OurClients from "components/Clients/OurClients";
import PageHeader from "components/common/PageHeader";
import { MembersData } from "components/Data/AppData";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";

import { EmployeeCreateInput } from "types/employee";
import { useCategoriesQuery } from "framework/category/getAllCategories";
import EmployeeModal from "components/common/EmployeeModal";
import { managerInput, useCreateManager } from "framework/Manager/createManager";

interface Props { }


interface State {
  isModal: boolean;
  modelData: EmployeeCreateInput;

}

const INITIAlIZE_DATA: State = {
  isModal: false,
  modelData: {} as EmployeeCreateInput,

};

const Managers: React.FC<Props> = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { isModal, modelData } = state;
  const { data: employeeData, error: employeeError, isLoading: employeeIsLoading } = useEmployeesQuery({});
  const { data: departmentData, error: departmentError, isLoading: departmentIsLoading } = useCategoriesQuery({});
  const { mutateAsync: createMutation } = useCreateManager();

  let managers = [
    {

      label: "Select Manager",
      value: 0,
    },
    {
      label: "Manager 1",
      value: 1,
    },
    {
      label: "Manager 2",
      value: 2,
    },
    {
      label: "Manager 3",
      value: 3,
    },
  ]

  const departments = useMemo(() => departmentData?.categories?.data?.results || [], [departmentData]);

  const handleModelData = (key: string, value: any) => {
    setState({
      ...state,
      modelData: {
        ...modelData,
        [key]: value,
      },
    });
  };



  if (employeeIsLoading || departmentIsLoading) return <div>Loading...</div>;
  if (employeeError || departmentError) return null;


  const closeModal = (reload: boolean = false) => {
    if (reload) {
      window.location.reload();
    }
    setState({ ...state, isModal: false, modelData: {} as EmployeeCreateInput });
  };

  const openModal = () => {
    setState({ ...state, isModal: true });
  };

  const handleCreateEmployee = async () => {
    try {
      let createInput = managerInput(modelData);
      await createMutation(createInput);

      closeModal(true);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle="Managers"
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-dark btn-set-task w-sm-100 me-2"
                onClick={() => {
                  openModal();
                }}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Manager
              </button>
              {/* <Dropdown>
                <Dropdown.Toggle as="button" className="btn btn-primary ">
                  Status
                </Dropdown.Toggle>
                <Dropdown.Menu as="ul" className="dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#!">
                      Company
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      AgilSoft Tech
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Macrosoft
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Google
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Pixelwibes
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Deltasoft Tech
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Design Tech
                    </a>
                  </li>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
          );
        }}
      />
      <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
        {MembersData.map((data: any, i: number) => {
          return (
            <div key={"skhd" + i} className="col">
              <OurClients
                avatar={data.avatar}
                post={data.post}
                name={data.name}
                department={data.Companyname}
                isMember={true}
              />
            </div>
          );
        })}
      </div>
      <EmployeeModal
        show={isModal}
        onClose={closeModal}
        handleModelData={handleModelData}
        modelData={modelData}
        departments={departments}
        managers={managers}
        onCreate={handleCreateEmployee}
        header="Add Manager"
        isManager={true}
      />
    </div>
  );
};

export default Managers;


