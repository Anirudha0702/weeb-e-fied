
import './TopCharacters.css'
import { getTopCharacters } from "../../Api/Jikan";
import { useQuery } from "@tanstack/react-query";
import { FaThumbsUp } from "react-icons/fa";
export default function TopCharacters() {
    const {data,isLoading,isPending}=useQuery(
        {
            queryKey:['top-characters'],
            queryFn:getTopCharacters
        }
    )
    if(isLoading || isPending){
        return <div>Loading...</div>
    }
 
  const characterDpStyles = {
    height: "90px",
  };
  const list = data?.map((el, idx) => {
    // el.images.webp.image_url
    // el.url
    // el.name
    // {el.about.slice(0, 50)}...
    return (
      <li key={idx} className='character'>
        <div className='character-dp'>
          <img
            src={el.images.webp.image_url}
            alt={el.name}
            style={characterDpStyles}
            className='character-dp'
          />
        </div>
        <div className='character-info'>
          <h3 className='character-name'>{el.name}</h3>
          <div className='character-about'>
            <p>{el.about.slice(0, 50)}...</p>
          </div>
          <div className='character-stats'>
            <div className='character-fav'>
              <FaThumbsUp />
              <span>{el.favorites}</span>
            </div>
          </div>
        </div>
      </li>
    );
  });
  return (

    //   {isLoading ? <LoadingSpinner /> : <ul>{list}</ul>}
    <ul className='list-wrapper'>{list}</ul>
  
  );
}