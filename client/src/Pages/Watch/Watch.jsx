import  { useEffect,useState } from 'react';
import { useParams } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer" 
import {FaPlayCircle} from "react-icons/fa"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import "./Watch.css"
import Spinner from '../../components/Loaders/Spinner/Spinner';

const Watch = () => {
  function getRandomColor() {

    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    var color = "rgb(" + red + "," + green + "," + blue + ")";
  
    return color;
  }
  
  const [streamURLs, setStreamURLs] = useState([]);
  const[playingURL,setPlayingURL]=useState("")

  const param = useParams();
  const anime=useQuery(
    {
        queryKey:["search", param.name], 
        queryFn:async () => {
            try {
              const response = await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/search/${param.name}`);
            return response?.data[0];
            } catch (error) {
              console.log(error)
            }
          }
    });
  
    const animeId=anime?.data?.id;
    console.log(animeId)
    const [selectedEpisode, setSelectedEpisode] = useState(localStorage.getItem(`${animeId}`) || 1);
    const info=useQuery({
      queryKey:["info", animeId], 
      queryFn:async () => {
        const response = await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/info/${animeId}`);
        return response?.data;
      },
      enabled: !!animeId
    })
    console.log(selectedEpisode)
    console.log(info?.data)
    const stream=useQuery(
      {
          queryKey:["watch", `episode-${selectedEpisode}`], 
          queryFn:async () => {
              const response = await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/watch/${info?.data?.episodes[selectedEpisode-1]?.id}`);
              return response.data;
            },
            enabled: !!info.data
      }
  );  

  console.log(stream) 
  useEffect(() => {
    setStreamURLs(stream.data);
    const url=streamURLs?.find((url) => url.quality === "default")?.url;
    setPlayingURL(url);
  }, [stream, streamURLs]);
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
          <VideoPlayer url={playingURL} width={'100%'} height='100%'/>
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
