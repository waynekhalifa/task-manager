import OurClients from "components/Clients/OurClients";
import NestableCard from "components/Tasks/NestableCard";
import { useSingleTask } from "framework/task/get-single-task";
import { SelectedTask } from "types/task";

interface Props {
  id: number;
}


const TaskDetails: React.FC<Props> = ({ id }) => {
  let { data, error, isLoading } = useSingleTask({ id });
  let user = {
    avatar: "https://via.placeholder.com/150",
    post: "Teacher",
    name: "John Doe",
    department: "Academic Department",

  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

  let task: any = data || {} as SelectedTask;

  return (
    <div style={{
      backgroundColor: "#F5F6FA",
      minHeight: "100vh",
      padding: 20,

    }}>
      <h2>Task Details</h2>
      <div className="container-xxl">
        <div className="row g-3 mb-3 mt-3">
          <div className="col-lg-4 col-md-12">
            <NestableCard data={data} />
          </div>
          <div className="col-lg-8 col-md-12">
            <OurClients
              avatar={user.avatar}
              post={user.post}
              name={user.name}
              department={user.department}
              onClickEdit={() => { }}
              onClickDelete={() => { }}
              details="lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.              
              "
            />
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Description</h5>
                <p className="card-text">{task.description}</p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div>
                  <h5 className="card-title">Task Status</h5>
                  <span className="badge bg-success">{task.task_progress}</span>
                </div>

              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Comments</h5>
                <div className="row g-3">
                  <div className="col-12">
                    <div className="d-flex align-items-start">
                      <img src={user.avatar} className="rounded-circle" alt="Cinque Terre" width={50} height={50} />
                      <div className="ms-3">
                        <h6 className="mb-0">{user.name}</h6>
                        <span className="small text-muted">{user.post}</span>
                        <p className="small text-muted">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.</p>

                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-start">
                      <img src={user.avatar} className="rounded-circle" alt="Cinque Terre" width={50} height={50} />
                      <div className="ms-3">
                        <h6 className="mb-0">{user.name}</h6>
                        <span className="small text-muted">{user.post}</span>
                        <p className="small text-muted">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-start">
                      <img src={user.avatar} className="rounded-circle" alt="Cinque Terre" width={50} height={50} />
                      <div className="ms-3">
                        <h6 className="mb-0">{user.name}</h6>
                        <span className="small text-muted">{user.post}</span>
                        <p className="small text-muted">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            d</div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;