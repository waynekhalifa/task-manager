import Chart from "react-apexcharts";

interface Props {
  data: any;
}

const SimpleChartTile: React.FC<Props> = ({ data }) => {
  return (
    <div className="card mb-4">
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
            width={
              data.chartData.options ? data.chartData.options.chart.width : 100
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default SimpleChartTile;
