import { useEffect } from "react";

interface Props {
  identity: any;
  Title: any;
  TitleRight: any;
  extraDivBody: any;
  footerBody: any;
  data: any;
}

const TodayTimeUtilisation: React.FC<Props> = ({
  identity,
  Title,
  TitleRight,
  extraDivBody,
  footerBody,
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

    // eslint-disable-next-line
  }, []);

  return (
    <div className="card">
      <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
        <h6 className="mb-0 fw-bold ">{Title}</h6>
        {TitleRight ? <h3 className="mb-0 fw-bold">{TitleRight}</h3> : null}
      </div>
      <div className="card-body">
        {extraDivBody ? extraDivBody() : null}
        <div id={"SimpleCahrt" + identity}></div>
        {footerBody ? footerBody : null}
      </div>
    </div>
  );
};

export default TodayTimeUtilisation;
