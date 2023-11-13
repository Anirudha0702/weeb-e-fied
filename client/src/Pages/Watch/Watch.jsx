import  { useState } from 'react';
import { useParams } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer" 
import {FaPlayCircle} from "react-icons/fa"
import "./Watch.css"
import Spinner from '../../components/Loaders/Spinner/Spinner';
import { useInfo, useSearch } from '../../hooks/useHooks';

const Watch = () => {
  function getRandomColor() {

    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    var color = "rgb(" + red + "," + green + "," + blue + ")";
  
    return color;
  }

  const param = useParams();
  const anime=useSearch(param.name);
    const animeId=anime[0]?.id;
    const [selectedEpisode, setSelectedEpisode] = useState(localStorage.getItem(`${animeId}`) || 1);
    const info=useInfo(animeId)

 const PlayVideo=(e,ep)=>{
  e.preventDefault();
  localStorage.setItem(`${animeId}`, ep);
  setSelectedEpisode(ep);
 }
  if(info.isLoading || info.isPending ) {
  return <div className="main__wrapper" >
      <div className="watch__wrapper">
        <div className="episodes">
        <Spinner/>
        
        </div>
        <div className="video__player">
          <Spinner/>
        </div>
      </div>
    </div>
  }
  return (
    <div className="main__wrapper" >
      <div className="watch__wrapper" data-anime={info?.data?.title}>
        <div className="episodes">
          <span>Episode Lists</span>
          {
            info.data?.episodes?.map((episode, index) => {
              return (
                <div className={`episode__card ${selectedEpisode===episode.number?'selected':""}`} key={index} onClick={(e) => PlayVideo(e,episode.number)}>
                  {`Episode ${episode.number}`}
                  {
                    selectedEpisode===episode.number?<FaPlayCircle/>:""
                  }
                </div>
              )
            })
          } 
        </div>
        <div className="video__player">
          <VideoPlayer episodeId={info?.data?.episodes[selectedEpisode-1]?.id} isLoading={info.isLoading}/>
        </div>
      </div>
      <div className="current-anime-details ">
            <div className="anime__poster__wrapper">
            <img
              className="anime__poster"
              src={info.data?.image|| "NA"}
            />
            </div>
<div className="anime-details-content ">
                <h1 className="title-large">
                  {info?.data?.title||'NA'}
                </h1>

                <p>CC-{info?.data?.totalEpisodes}<FaPlayCircle/></p>

                <p style={{width:"80%"}}>
                  {info?.data?.description||'NA'}

                </p>
                
                <p>
                  Genres:{
                    info?.data?.genres?.map((genre, index) => {
                      return (
                        <span key={index} className="genre" style={{backgroundColor:getRandomColor(),color:"#fff"}}>
                          {genre}
                        </span>
                      );
                    })
                  }
                </p>
              </div>
          </div>
        </div>
  );
}

export default Watch;
