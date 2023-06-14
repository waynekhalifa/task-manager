import { useEffect } from "react";
import ApexCharts from "apexcharts";
import { Dropdown } from "react-bootstrap";

interface Props {
  identity: any;
  Title: any;
  TitleRight: any;
  extraDivBody: any;
  data: any;
}

const GeneralChartCardDropDown: React.FC<Props> = ({
  identity,
  Title,
  TitleRight,
  extraDivBody,
  data,
}) => {
  useEffect(() => {
    if (data) {
      var opt = data.options;

      var chart = new ApexCharts(
        document.getElementById("SimpleCahrt" + identity),
        opt
      );
      chart.render();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card">
      <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
        <div className="info-header">
          <h6 className="mb-0 fw-bold ">{Title}</h6>
        </div>
        <Dropdown as="div">
          <Dropdown.Toggle
            as="button"
            className="btn btn-sm btn-link "
          ></Dropdown.Toggle>
          <Dropdown.Menu as="ul" className="border-0 shadow dropdown-menu-end">
            <li>
              <a className="dropdown-item py-2 rounded" href="#!">
                Last 7 days
              </a>
            </li>
            <li>
              <a className="dropdown-item py-2 rounded" href="#!">
                Last 30 days
              </a>
            </li>
            <li>
              <a className="dropdown-item py-2 rounded" href="#!">
                Last 60 days
              </a>
            </li>
          </Dropdown.Menu>
        </Dropdown>
        {TitleRight ? <h4 className="mb-0 fw-bold">{TitleRight}</h4> : null}
      </div>
      <div className="card-body">
        {extraDivBody ? extraDivBody() : null}
        <div id={"SimpleCahrt" + identity}></div>
      </div>
    </div>
  );
};

export default GeneralChartCardDropDown;
