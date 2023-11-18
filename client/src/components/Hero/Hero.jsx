
import { getRecentAnimes } from "../../Api/Kitsu"
import { useQuery } from "@tanstack/react-query"
import "./Hero.css"
import { useEffect, useState } from "react"
import {
  FaCalendar,
  // FaChevronLeft,
  // FaChevronRight,
  FaClock,
  FaPlayCircle,
} from "react-icons/fa";
import {BsFillInfoCircleFill} from "react-icons/bs"
import { Link } from "react-router-dom";
import Spinner from "../Loaders/Spinner/Spinner";
const Hero = () => {
  const [curent, SetCurrent] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
        curent === 0 ? SetCurrent(7) : SetCurrent(curent + 1)
        curent === 7 ? SetCurrent(0) : SetCurrent(curent + 1)
    }, 5000)

    return () => {
        clearInterval(interval)
    }
})
    const recentAnimes=useQuery({
        queryKey:['recentAnimes'],
        queryFn:getRecentAnimes
    })

    if(recentAnimes.isLoading){
        return <div className="hero">
          <Spinner/>
        </div>
    }
    
  return (
    <div className='hero'>
        <div className="slide__wrapper" style={{ transform: `translateX(-${curent * 100}vw)` }}>
            {
                recentAnimes.data?.data?.map((anime,index)=>{
                  const details=anime.attributes
                  return(
                    <div key={index} className="slide">
                        <div className="slide__content">
                            <h1 className="anime__title">
                            {details.titles.en || details.titles.en_jp}
                            </h1>
                            <div className="anime__stats">
                              <span className="stat __type"><FaPlayCircle size={14}/>{details.subtype}</span>
                              <span className="stat __eplength"><FaClock size={14}/>{details.episodeLength + "m"}</span>
                              <span className="stat __st__time">
                                <FaCalendar size={13} /> {details.startDate}
                              </span>
                              <span className="stat __quality__count__wrapper">
                                <span className="quality">HD</span>
                                <span className="episode__count">
                                CC:{details.episodeCount || "Unknown"}
                                </span>
                              </span>
                            </div>
                            <p className="description">
                            {(details.background && details.background.slice(0, 200) + "...") ||
                              (details.synopsis && details.synopsis.slice(0, 200) + "...")}
                          </p>
                          <div className="button__wrapper">
                            <Link to={`/watch/${details.titles.en_jp || details.titles.en}`} style={{padding:0}}>
                              <button className="btn watch__now" >
                                <FaPlayCircle size={14}/>Watch Now
                              </button>
                            </Link>
                            <Link to={`/details/${anime.id}?provider=kitsu`}>
                              <button className="btn details"><BsFillInfoCircleFill size={14}/>Details</button>
                            </Link>
                          </div>
                          </div>
                        <div className="slide__image__Wrapper">
                        <img src={
                          anime.attributes.posterImage?.original||
                          anime.attributes.posterImage?.large||
                          anime.attributes.posterImage?.tiny||
                          anime.attributes.posterImage?.small} alt="hhd" className="slide__img"/>
                        </div>
                    </div>
                )
                })
            }
        </div>
    </div>
  )
}

export default Hero