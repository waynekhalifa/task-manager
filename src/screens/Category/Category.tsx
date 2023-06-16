import { useCreateCategory } from 'framework/category/create-category';
import { useUpdateCategory } from 'framework/category/update-category';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { CategoryCreateInput, CategoryUpdateInput } from 'types/category';


interface State {
  isDeleteModal: boolean;
  isAddModal: boolean;
  isEditModal: boolean;
  modalHeader: any;
  editModeldata: any;
}

const INITIAlIZE_DATA: State = {
  isDeleteModal: false,
  isAddModal: false,
  isEditModal: false,
  modalHeader: "",
  editModeldata: ""
};

const Categories: React.FC = () => {
  const { mutateAsync: createMutation } = useCreateCategory();
  const { mutateAsync: editMutation } = useUpdateCategory();
  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { isDeleteModal, modalHeader, editModeldata, isAddModal, isEditModal } = state;
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryUpdateInput>({} as CategoryUpdateInput);



  const handleAddCategory = () => {
    setState({
      ...state,
      isAddModal: true,
      modalHeader: "Create Category"
    });
  };

  const handleEditCategory = () => {
    setState({
      ...state,
      isEditModal: true,
      modalHeader: "Edit Category"
    });
  };

  const handleDeleteCategory = () => {
    setState({
      ...state,
      isDeleteModal: true,
      modalHeader: "Delete Category"
    });
  };


  const addCategory = () => {
    const inputData = {
      name: editModeldata.name,
    } as CategoryCreateInput;

    createMutation(inputData).then((res) => {
      setState({ ...state, isAddModal: false, editModeldata: "" });
    }).catch((err) => {
      alert(err);
    }
    );
  };
  const editCategory = () => {
    const inputData = {
      id: selectedCategory.id,
      name: editModeldata.name,
    } as CategoryUpdateInput;

    editMutation(inputData).then((res) => {
      setState({ ...state, isEditModal: false, editModeldata: "" });
    }).catch((err) => {
      alert(err);
    });
  };


  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}>
        <h2>List Categories</h2>
        <button
          type="button"
          className="btn btn-dark w-sm-100"
          onClick={handleAddCategory}
        >
          <i className="icofont-plus-circle me-2 fs-6" />Create Category
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Created At</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Cat1</th>
            <td>
              {new Date().toISOString().split("T")[0]}
            </td>

            <td>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleEditCategory}
                >
                  <i className="icofont-edit text-success"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleDeleteCategory}
                >
                  <i className="icofont-ui-delete text-danger"></i>
                </button>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
      <Modal
        show={isAddModal || isEditModal}
        onHide={() => {
          setState({ ...state, isAddModal: false, isEditModal: false, editModeldata: "" });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {modalHeader}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput77" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput77"
              placeholder="Explain what the Project Name"
              value={editModeldata ? editModeldata.name : ""}
              onChange={(e) => {
                setState({
                  ...state,
                  editModeldata: { ...editModeldata, name: e.target.value },
                });
              }}
            />
          </div>


        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setState({ ...state, isAddModal: false, isEditModal, editModeldata: "" });
            }}
          >
            Cancel
          </button>
          {isAddModal && <button type="button" className="btn btn-primary"
            onClick={addCategory}
          >
            Create
          </button>}
          {isEditModal && <button type="button" className="btn btn-primary"
            onClick={editCategory}
          >
            Save
          </button>}
        </Modal.Footer>
      </Modal>
      <Modal
        show={isDeleteModal}
        centered
        onHide={() => {
          setState({ ...state, isDeleteModal: false });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center flex-column d-flex">
          <i className="icofont-ui-delete text-danger display-2 text-center mt-2" />
          <p className="mt-4 fs-5 text-center">
            You can only delete this item Permanently
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setState({ ...state, isDeleteModal: false });
            }}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-danger color-fff">
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )

};

export default Categories;