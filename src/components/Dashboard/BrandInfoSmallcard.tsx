interface Props {
  title: string;
  value: string;
  iconClass: string;
}

const BrandInfoSmallcard: React.FC<Props> = ({ title, value, iconClass }) => {
  return (
    <div className="card bg-primary">
      <div className="card-body text-white d-flex align-items-center">
        <i className={iconClass}></i>
        <div className="d-flex flex-column ms-3">
          <h6 className="mb-0">{title}</h6>
          <span className="text-white">{value}</span>
        </div>
      </div>
    </div>
  );
};

export default BrandInfoSmallcard;
