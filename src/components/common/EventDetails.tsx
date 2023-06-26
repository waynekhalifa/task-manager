import { useSingleTask } from "framework/task/get-single-task";

interface Props {
  id: number;
}

const EventDetails: React.FC<Props> = ({ id }) => {
  const { data, error, isLoading } = useSingleTask({ id });

  if (error) return null;

  const taskData: any = data || {};

  console.log(taskData);

  return (
    <div className="row">
      {isLoading && <>Loading...</>}
      {!isLoading && (
        <>
          <h2 className="fw-bold mb-4">{taskData.name}</h2>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Assignee</h6>
            </div>
            <div className="col-8">
              <div className="d-flex align-items-center">
                <div
                  className="border border-primary p-2 rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ width: 32, height: 32 }}
                >
                  <i className="icofont-user"></i>
                </div>
                <span>Wani Joseph</span>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Due Date</h6>
            </div>
            <div className="col-8">
              <input
                type="date"
                className="form-control"
                id="datepickerdedass"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Project</h6>
            </div>
            <div className="col-8">Project Name</div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Status</h6>
            </div>
            <div className="col-8">
              <select className="form-select">
                <option>In Progress</option>
                <option value="1">Completed</option>
                <option value="2">Wating</option>
                <option value="3">Decline</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Priority</h6>
            </div>
            <div className="col-8">
              <select className="form-select">
                <option value={"MEDIUM"}>MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Description</h6>
            </div>
            <div className="col-12">Text box for description</div>
          </div>
          <div className="row">
            <div className="col-12">
              <textarea
                className="form-control"
                id="comment"
                rows={3}
              ></textarea>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;
