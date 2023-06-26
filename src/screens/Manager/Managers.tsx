import React, { useState } from "react";
import OurClients from "components/Clients/OurClients";
import PageHeader from "components/common/PageHeader";

import { EmployeeCreateInput, Manager } from "types/employee";
import { useCategoriesQuery } from "framework/category/getAllCategories";
import EmployeeModal from "components/common/EmployeeModal";
import { managerInput, useCreateManager } from "framework/Manager/createManager";
import { useManagerQuery } from "framework/Manager/getAllManagers";
import { getCategory } from "utils/helper";
import { CategoryUpdateInput } from "types/category";

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
  const { mutateAsync: createMutation } = useCreateManager();

  const { data: managerData, error: managerError, isLoading: managerIsLoading } = useManagerQuery({});

  const { data: departmentData, error: departmentError, isLoading: departmentIsLoading } = useCategoriesQuery({});

  if (departmentIsLoading || managerIsLoading) return <div>Loading...</div>;
  if (departmentError || managerError) return null;

  let managers: Manager[] = managerData?.managers?.data?.results || [];

  let managerOptions = managers.map((manager) => {
    return {
      label: manager?.employee?.user?.first_name + " " + manager?.employee?.user?.last_name,
      value: manager.id,
    };
  }
  );
  managerOptions.unshift({
    label: "Select Manager",
    value: 0,
  });


  const departments: CategoryUpdateInput[] = departmentData?.categories?.data?.results || [];
  const departmentOptions = departments.map((department) => {
    return {
      label: department.name,
      value: department.id,
    };
  }
  );
  departmentOptions.unshift({
    label: "Select Department",
    value: 0,
  });


  const handleModelData = (key: string, value: any) => {
    setState({
      ...state,
      modelData: {
        ...modelData,
        [key]: value,
      },
    });
  };




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
    if (modelData?.department === 0) {
      alert("Please select department");
      return;
    }
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
        {managers.map((manager, i: number) => {
          return (
            <div key={"skhd" + i} className="col">
              <OurClients
                id={manager?.id}
                avatar={manager?.employee?.user?.avatar}
                post={manager?.description}
                name={manager?.employee?.user?.first_name + " " + manager?.employee?.user?.last_name}
                department={getCategory(departments, manager?.department)}
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
        departments={departmentOptions}
        managers={managerOptions}
        onCreate={handleCreateEmployee}
        header="Add Manager"
        isManager={true}
      />
    </div>
  );
};

export default Managers;


