import { Modal } from "react-bootstrap";


interface Props {
  onClose: any;
  show: any;
  modalHeader: string;
}

const AddCommentModal: React.FC<Props> = ({ onClose, show, modalHeader }) => {
  return (
    <Modal centered size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* view project description here  */}
        
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Comment</th>
              <th scope="col">Created By</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Comment 1</td>
              <td>Admin</td>
              <td>2021-09-01</td>
            </tr>
            <tr>
              <td>Comment 2</td>
              <td>Admin</td>
              <td>2021-09-01</td>
            </tr>
            <tr>
              <td>Comment 3</td>
              <td>Admin</td>
              <td>2021-09-01</td>
            </tr>
          </tbody>
        </table>

        <form className="row g-3">
          <div className="col-md-12">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <textarea

              className="form-control"
              id="comment"
              rows={3}
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
        <button className="btn btn-primary" onClick={onClose}>
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCommentModal;
