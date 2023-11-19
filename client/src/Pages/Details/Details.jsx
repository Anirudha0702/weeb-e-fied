import './Details.css'
import {useParams, useSearchParams,Link} from 'react-router-dom'
import { useAnimeById } from '../../hooks/useHooks';
import Spinner from '../../components/Loaders/Spinner/Spinner';
import { FaPlayCircle } from 'react-icons/fa';
import getRandomColor from '../../utils/getRandomColor';
import noImage from "../../assets/no-image.webp";
const Details = () => {
    const param=useParams();
    const [query,setQuery]=useSearchParams();
    
    const info=useAnimeById(param.name,query.get("provider"));
  if(info.isLoading || info.isPending) return <div className="" style={{position:'relative',height:'90svh'}}>
    <Spinner/>
  </div>
  return (
    <div className="details__wrapper">
      <div className="cover__wrapper">
        <img 
        src={info?.data?.cover_image || noImage} 
        alt="" 
        className="cover__image" />
      </div>
      <div className="info__wrapper">
        <div className="poster__option__wrapper">
         <div className="poster__wrapper">
         <img 
          src={info?.data?.poster_image || noImage}
          alt="" 
          className="poster__image" />
         </div>
         <div className="option__wrapper">
          <Link to={`/watch/${info.data?.title}`} style={{padding:0}} className='link'>
                              <button className="watch" >
                                <FaPlayCircle size={14}/>Watch Now
                              </button>
                            </Link>
            <select name="" id="" className='options' >
                <option value="Watching" >Watching</option>
                <option value="Watched">Watched</option>
                <option value="Dropped" >Dropped</option>
                <option value="Planned" >Planned</option>
                <option value="On-Hold" >On-Hold</option>
            </select>
         </div>
        </div>
        <span className='description'>
          <h2>{info.data?.title}</h2>
          <p >
          {info?.data?.description?.replace(/(\r\n|\n|\r)/gm, "") || "No Description Available"}
        </p>
        <span>
          {
            info.data?.genres.map((genre,index)=>(
              <span key={index} className="genre" style={{backgroundColor:getRandomColor()}}>{genre}</span>
            )
            )
          }
        </span>
        </span>
        <div className="_details">
         <Link to={`https://youtube.com/watch?v=${info.data?.youtubeTrailer}`} className='link'>
          <div className="play__trailer" style={{backgroundImage:`url('${info.data?.poster_image}')`}}>
            <FaPlayCircle size={50}/>Play Trailer
          </div>
         </Link>
          <span>Anime Details</span>
          <div className="briefs">
            <span className="_title">Title: {info.data?.title}</span>
            <span className="_type">Type: {info.data?.showType}</span>
            <span className="aired">Aired: {info.data?.aired}</span>
            <span className="age_rating">Age Rating: {info.data?.ageRating}</span>
            <span className="status">Status: {info.data?.status}</span>
            <span className="totals_ep">Episodes: {info.data?.totalEps}</span>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Details
