import useApp from "hooks/useApp";
import { ProgressBar } from "react-bootstrap";
import { sumDateRange, sumDaysLeftFromToDay } from "utils/convert";

interface Props {
  data: any;
}

const NestableCard: React.FC<Props> = ({ data }) => {


  const { push } = useApp();
  const getShortDescription = (description: string) => {
    if (description.length > 200) {
      return description.substring(0, 200) + "...";
    } else {
      return description;
    }
  };
  return (
    <div className="dd-handle mt-2 pointer"
      onClick={() => push(`/dashboard/tasks/${data.id}`)}
    >
      <div className="task-info d-flex align-items-center justify-content-between">
        <h6
          className={`light-success-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0`}
        >
          {data.name}
        </h6>
        <div className="task-priority d-flex flex-column align-items-center justify-content-center">
          <div className="avatar-list avatar-list-stacked m-0">
            {data.files
              ? data.files.map((d: any, i: any) => (
                <img
                  key={"jfgsoihgh" + i}
                  className="avatar rounded-circle small-avt"
                  src={d.file}
                  alt=""
                />
              ))
              : null}
          </div>
          <span
            className={`badge ${data.task_priority === "MEDIUM"
              ? "bg-warning"
              : data.task_priority === "HIGH"
                ? "bg-danger" :
                data.task_priority === "CRITICAL" ? "bg-danger" :
                  data.task_priority === "LOW" ? "bg-info"
                    : "bg-success"
              } text-end m-2`}
          >
            {data.task_priority}
          </span>
        </div>
      </div>
      <div className="row g-2 pt-4">
        <div className="col-12">
          <div className="d-flex align-items-center">
            {/* description here */}
            <i className="icofont-info-circle" style={{ marginRight: 5 }}></i>
            <p className="small-14 mb-0">{getShortDescription(data.description)}</p>
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-center"
            style={{ cursor: 'pointer' }}
          // onClick={onClickAddAttachment}
          >
            <i className="icofont-paper-clip"></i>
            <span className="badge bg-light text-dark ms-2">{data.files.length || 0}</span>
            {/* <span
              className="avatar rounded-circle text-center pointer sm"
            >
              <i className="icofont-ui-add"></i>
            </span> */}
          </div>
        </div>
        <div className="col">
          <div className="d-flex align-items-center">
            <i className="icofont-sand-clock"></i>
            <span className="badge bg-light text-dark ms-2">{sumDateRange(data.start_at, data.end_at)} Days</span>
          </div>
        </div>

        <div className="col">
          <div className="d-flex align-items-center"
            style={{ cursor: 'pointer' }}
          // onClick={onClickAddComment}
          >
            <i className="icofont-ui-text-chat"></i>
            <span className="badge bg-light text-dark ms-2">{data.comment_count || 0}</span>
            {/* <span
              className="avatar rounded-circle text-center pointer sm"
            >
              <i className="icofont-ui-add"></i>
            </span> */}
          </div>
        </div>

        {data.ticket && <div className="col-sm text-end">
          <div className="small text-truncate light-warning-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
            {"ticket: " + data.ticket}
          </div>
        </div>}
      </div>
      <div className="dividers-block"></div>
      <div className="d-flex align-items-center justify-content-between mb-2">
        {/* <h4 className="small fw-bold mb-0">Progress</h4> */}
        <span className="small light-danger-bg  p-1 rounded">
          <i className="icofont-ui-clock"></i> {sumDaysLeftFromToDay(data.start_at)} Days Left
        </span>
      </div>
      <ProgressBar style={{ height: "8px" }}>
        <ProgressBar variant="secondary" now={15} style={{ width: "25%" }} />
      </ProgressBar>
      25% Complete
    </div>
  );
};

export default NestableCard;
