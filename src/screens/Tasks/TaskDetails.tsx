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
    post: "CEO",
    name: "John Doe",
    Companyname: "Company Name",

  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

  let task: any = data || {} as SelectedTask;

  return (
    <div>
      <h2>Task Details</h2>
      <div className="container-xxl">
        <div className="row g-3 mb-3 mt-3">
          <div className="col-4">
            <NestableCard data={data} />
          </div>
          <div className="col-8">
            <OurClients
              avatar={user.avatar}
              post={user.post}
              name={user.name}
              CompanyName={user.Companyname}
              onClickEdit={() => { }}
              onClickDelete={() => { }}
              details="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices."
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;