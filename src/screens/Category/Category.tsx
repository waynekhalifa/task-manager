import { useCreateCategory } from "framework/category/createCategory";
import { useDeleteCategory } from "framework/category/deleteCategory";
import { useCategoryQuery } from "framework/category/getAllCategory";
import { useUpdateCategory } from "framework/category/updateCategory";
import React from "react";
import { Modal } from "react-bootstrap";
import { CategoryCreateInput, CategoryUpdateInput } from "types/category";

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
  editModeldata: "",
};

const Categories: React.FC = () => {
  const { mutateAsync: createMutation } = useCreateCategory();
  const { mutateAsync: editMutation } = useUpdateCategory();
  const { mutateAsync: deleteMutation } = useDeleteCategory();
  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { isDeleteModal, modalHeader, editModeldata, isAddModal, isEditModal } =
    state;
  const [selectedCategory, setSelectedCategory] =
    React.useState<CategoryUpdateInput>({} as CategoryUpdateInput);

  let { data, error, isLoading } = useCategoryQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

  let categories: CategoryUpdateInput[] = data?.categories.data.results || [];

  const handleAddCategory = () => {
    setState({
      ...state,
      isAddModal: true,
      modalHeader: "Create Category",
    });
  };

  const handleEditCategory = (category: CategoryUpdateInput) => {
    setSelectedCategory(category);
    setState({
      ...state,
      isEditModal: true,
      modalHeader: "Edit Category",
      editModeldata: category.name,
    });
  };

  const handleDeleteCategory = (category: CategoryUpdateInput) => {
    setState({
      ...state,
      isDeleteModal: true,
      modalHeader: "Delete Category",
    });
    setSelectedCategory(category);
  };

  const handleModalClose = () => {
    setState({
      ...state,
      isDeleteModal: false,
      isAddModal: false,
      isEditModal: false,
      modalHeader: "",
      editModeldata: "",
    });
    setSelectedCategory({} as CategoryUpdateInput);
  };

  const addCategory = () => {
    const inputData = {
      name: editModeldata.name,
    } as CategoryCreateInput;

    createMutation(inputData)
      .then((res) => {
        categories.push(res.session.data);
        handleModalClose();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const editCategory = () => {
    const inputData = {
      id: selectedCategory.id,
      name: editModeldata.name,
    } as CategoryUpdateInput;

    editMutation(inputData)
      .then((res) => {
        categories.map((category: CategoryUpdateInput) => {
          if (category.id === res.session.data.id) {
            category.name = res.session.data.name;
          }
        });
        handleModalClose();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const deleteCategory = () => {
    const inputData = {
      id: selectedCategory.id,
      name: selectedCategory.name,
    } as CategoryUpdateInput;

    deleteMutation(inputData)
      .then((res) => {
        categories = categories.splice(categories.indexOf(selectedCategory), 1);
        handleModalClose();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2>List Categories</h2>
        <button
          type="button"
          className="btn btn-dark w-sm-100"
          onClick={handleAddCategory}
        >
          <i className="icofont-plus-circle me-2 fs-6" />
          Create Category
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
          {categories.length > 0 &&
            categories.map((category: CategoryUpdateInput) => (
              <tr key={category.id}>
                <th scope="row">{category.name}</th>
                <td>
                  {category.created_at
                    ? category.created_at.split("T")[0]
                    : new Date().toISOString().split("T")[0]}
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
                      onClick={() => handleEditCategory(category)}
                    >
                      <i className="icofont-edit text-success"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => handleDeleteCategory(category)}
                    >
                      <i className="icofont-ui-delete text-danger"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal show={isAddModal || isEditModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
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
            onClick={handleModalClose}
          >
            Cancel
          </button>
          {isAddModal && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={addCategory}
            >
              Create
            </button>
          )}
          {isEditModal && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={editCategory}
            >
              Save
            </button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal show={isDeleteModal} centered onHide={handleModalClose}>
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
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger color-fff"
            onClick={deleteCategory}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categories;
