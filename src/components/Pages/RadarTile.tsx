import Chart from "react-apexcharts";
import { Dropdown } from "react-bootstrap";

interface Props {
  data: any;
}

const RadarTile: React.FC<Props> = ({ data }) => {
  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0">
        <h6 className="m-0">{data.title}</h6>
        <Dropdown>
          <button className="btn btn-sm btn-link text-muted" type="button">
            <i className="fa fa-external-link"></i>
          </button>
          <Dropdown.Toggle
            variant=""
            className="btn btn-sm btn-link text-muted"
          ></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#!">Action</Dropdown.Item>
            <Dropdown.Item href="#!">Another action</Dropdown.Item>
            <Dropdown.Item href="#!">Something else here</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="card-body">
        {data.chartData.options ? (
          <Chart
            options={data.chartData.options}
            series={data.chartData.series}
            type={
              data.chartData.options ? data.chartData.options.chart.type : "bar"
            }
            height={
              data.chartData.options ? data.chartData.options.chart.height : 315
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default RadarTile;
