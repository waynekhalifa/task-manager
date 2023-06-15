import Sidebar from "components/common/Sidebar";

const MainIndex: React.FC = () => {
  const activekey = () => {
    var res: any = window.location.pathname;
    var baseUrl: any = process.env.PUBLIC_URL;
    baseUrl = baseUrl.split("/");
    res = res.split("/");
    // res = res.length > 1 ? res[res.length-1] : "/";
    res = res.length > 0 ? res[baseUrl.length] : "/";
    res = res ? "/" + res : "/";
    const activeKey1 = res;
    //cdv
    return activeKey1;
  };
  return (
    <div id="mytask-layout" className="theme-indigo">
      <Sidebar activekey={activekey()} />
      <>Pages</>
    </div>
  );
};

export default MainIndex;
