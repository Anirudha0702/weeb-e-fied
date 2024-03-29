import "./Section.css";
import { useList } from "../../hooks/useHooks";
import { Link } from "react-router-dom";
import SectionLoader from "../Loaders/SectionLoader/SectionLoader";
const Section = ({ header ,className}) => {
  const { data, isError, isLoading } = useList(header.toLowerCase());
  if(isLoading) return <SectionLoader header={header} className={className}/>
  return (
    <div className={`section ${className}`} data-header={header}>
      {data?.data.map((item) => {
        return (
          <Link key={item.id} to={`/details/${item.id}?provider=kitsu`}>
            <div  className="item-anime">
            <img
              src={
                item.attributes.posterImage?.tiny || 
                item.attributes.posterImage?.small || 
                item.attributes.posterImage?.medium || 
                item.attributes.posterImage?.large || 
                item.attributes.posterImage?.original}
              alt={
                item.attributes.titles.en ||
                item.attributes.titles.en_jp ||
                item.attributes.titles.ja_jp ||
                item.attributes.titles.en_us ||
                item.attributes.canonicalTitle
              }
            />
            <div className="section-item-info">
              <h4>
                {item.attributes.titles.en ||
                item.attributes.titles.en_jp ||
                item.attributes.titles.ja_jp ||
                item.attributes.titles.en_us ||
                item.attributes.canonicalTitle}
              </h4>
              <p>
                {item.attributes?.showType} 
                {item.attributes?.episodeCount ? ` | ${item.attributes?.episodeCount} episodes` : ""}
              </p>
            </div>
          </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Section;
