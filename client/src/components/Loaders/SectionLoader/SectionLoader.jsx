import "./SectionLoader.css";
const SectionLoader = ({header,className}) => {
  return (
    <div className={`flex flex-col gap-2 mt-20 relative ${className}`} data-header={header}>
      <div className="item-anime section-loader">
        <div className="img"></div>
        <div className="section-item-info"></div>
      </div>
      <div className="item-anime section-loader">
        <div className="img"></div>
        <div className="section-item-info"></div>
      </div>
      <div className="item-anime section-loader">
        <div className="img"></div>
        <div className="section-item-info"></div>
      </div>
      <div className="item-anime section-loader">
        <div className="img"></div>
        <div className="section-item-info"></div>
      </div>
      <div className="item-anime section-loader">
        <div className="img"></div>
        <div className="section-item-info"></div>
      </div>
    </div>
  );
};

export default SectionLoader;
