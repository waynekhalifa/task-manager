import { useState } from "react";
import Chart from "react-apexcharts";

type IState = {
  options: any;
  series: any;
};

interface Props {
  data: any;
}

const ApexSparkTile: React.FC<Props> = ({ data }) => {
  const INITIAL_STATE: IState = {
    options: data.chartData.options,
    series: data.chartData.series,
  };
  const [state, setState] = useState<IState>(INITIAL_STATE);

  return (
    <div className="card mb-4">
      <div className="card-body">
        {state.options ? (
          <Chart
            options={state.options}
            series={state.series}
            type={state.options ? state.options.chart.type : "bar"}
            height={state.options ? state.options.chart.height : 315}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ApexSparkTile;
