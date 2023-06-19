import { ProgressBar } from "react-bootstrap";

interface Props {
  teamImage: any;
  logo: any;
  logoBg: any;
  title: any;
  startDate: any;
  endDate: any;
  category: any;
  onClickEdit?: any;
  onClickDelete?: any;
  onClickAddMember?: any;
  onClickAddAttachment?: any;
  onClickViewDescription?: any;
}

const CurrentClientProject: React.FC<Props> = ({
  teamImage,
  logo,
  logoBg,
  title,
  category,
  startDate,
  endDate,
  onClickEdit,
  onClickDelete,
  onClickAddMember,
  onClickAddAttachment,
  onClickViewDescription,
}) => {

  const sumDateRange = () => {
    let date1: any = new Date(startDate);
    let date2: any = new Date(endDate);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sumDaysLeftFromToDay = () => {
    const date1: any = new Date();
    let date2: any = new Date(startDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };


  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mt-5">
          <div className="lesson_name">
            <div className={"project-block " + title}>
              <img src={logo} className={title} alt={title} width={50} height={50} />
            </div>
            <span className="small text-muted project_name fw-bold">{category}</span>
            <h6 className="mb-0 fw-bold  fs-6  mb-2">{title}</h6>
          </div>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClickEdit}
            >
              <i className="icofont-edit text-success"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClickDelete}
            >
              <i className="icofont-ui-delete text-danger"></i>
            </button>
          </div>
        </div>

        {/* //TODO : Add team member
         <div className="d-flex align-items-center">
          <div className="avatar-list avatar-list-stacked pt-2">
            {teamImage.map((d: any, i: any) => (
              <img
                key={"ihihb" + i}
                className="avatar rounded-circle sm"
                src={d}
                alt=" "
              />
            ))}
            <span
              className="avatar rounded-circle text-center pointer sm"
              onClick={onClickAdd}
            >
              <i className="icofont-ui-add"></i>
            </span>
          </div>
        </div> */}
        <div className="row g-2 pt-4">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="icofont-paper-clip"></i>
              <span className="ms-2">5 Attach</span>
              <span
                className="avatar rounded-circle text-center pointer sm"
                onClick={onClickAddAttachment}
              >
                <i className="icofont-ui-add"></i>
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="icofont-sand-clock"></i>
              <span className="ms-2">{sumDateRange()} Days</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="icofont-group-students "></i>
              <span className="ms-2">5 Members</span>
              <span
                className="avatar rounded-circle text-center pointer sm"
                onClick={onClickAddMember}
              >
                <i className="icofont-ui-add"></i>
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="icofont-ui-text-chat"></i>
              <span className="ms-2">10</span>
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center">
              <i className="icofont-align-left "></i>
              <span className="ms-2">Description</span>
              <span
                className="avatar rounded-circle text-center pointer sm"
                onClick={onClickViewDescription}
              >
                <i className="icofont-eye-alt"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="dividers-block"></div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4 className="small fw-bold mb-0">Progress</h4>
          <span className="small light-danger-bg  p-1 rounded">
            <i className="icofont-ui-clock"></i> {sumDaysLeftFromToDay()} Days Left
          </span>
        </div>
        <ProgressBar style={{ height: "8px" }}>
          <ProgressBar variant="secondary" now={15} style={{ width: "25%" }} />
          <ProgressBar
            variant="secondary"
            now={30}
            style={{ width: "25%", marginLeft: 10 }}
          />
          <ProgressBar
            variant="secondary"
            now={10}
            style={{ width: "25%", marginLeft: 10 }}
          />
        </ProgressBar>
      </div>
    </div >
  );
};

export default CurrentClientProject;
