import { useState } from "react";
import Chart from "react-apexcharts";

interface Props {
  identity: any;
  Title: any;
  TitleRight: any;
  extraDivBody: any;
  data: any;
}

type IState = { option: any; series: any };

const GeneralChartCard: React.FC<Props> = ({
  identity,
  Title,
  TitleRight,
  extraDivBody,
  data,
}) => {
  const INITIAL_STATE: IState = {
    option: data.options,
    series: data.options.series,
  };
  const [state, setState] = useState<IState>(INITIAL_STATE);
  const { option, series } = state;

  return (
    <div className="card">
      <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
        <h6 className="mb-0 fw-bold ">{Title}</h6>
        {TitleRight ? <h4 className="mb-0 fw-bold">{TitleRight}</h4> : null}
      </div>
      <div className="card-body">
        {extraDivBody ? extraDivBody() : null}
        <div ac-chart="'donut'" id={"SimpleCahrt" + identity}>
          <Chart
            options={option}
            series={series}
            type={option ? option.chart.type : "bar"}
            height={option ? option.chart.height : 320}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralChartCard;
