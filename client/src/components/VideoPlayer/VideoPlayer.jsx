import "./VideoPlayer.css";
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Spinner from "../Loaders/Spinner/Spinner";
import { useStream } from "../../hooks/useHooks";
import { IoIosPlay,IoIosPause } from "react-icons/io";
import { BiSolidVolumeMute } from "react-icons/bi";
import { MdOutlineFullscreen ,MdOutlineFullscreenExit } 
from "react-icons/md";
import { GiSpeaker } from "react-icons/gi";
import { TbRewindBackward10,TbRewindForward10 } from "react-icons/tb";
const VideoPlayer = ({episodeId,isLoading}) => {
  const[videoUrl, setVideoUrl] = useState("");
  const[duration,setDuration]=useState(0);
  const[played,setPlayed]=useState(0);
  const[progress,setProgress]=useState(0);
  const[volume,setVolume]=useState(0.5);
  const[loaded,setLoaded]=useState(0);
  const[playing,setPlaying]=useState(true);
  const[quality, setQuality] = useState('default');
  const[isFullScreen, setIsFullScreen] = useState(false);
  const stream=useStream(episodeId); 
  const videoRef=useRef(null);
  const video_Ref=useRef(null);
  const play=()=>{
    setPlaying(!playing);
  
  }
  const formatTime=(seconds)=>{
    if(isNaN(seconds)){
      return "00:00";
    }
    const date=new Date(seconds*1000);
    const mm=date.getUTCMinutes();
    const ss=date.getUTCSeconds().toString().padStart(2,"0");
    
    return `${mm}:${ss}`
  }
  const handleProgress=(palyed)=>{
    setPlayed(palyed.playedSeconds);
    setProgress((played/duration)*100);
    setLoaded(palyed.loadedSeconds/duration*100);
  }
  const fullScreen=()=>{
    if (video_Ref.current.requestFullscreen) {
      video_Ref.current.requestFullscreen();
    } else if (video_Ref.current.webkitRequestFullscreen) {
      video_Ref.current.webkitRequestFullscreen();
    } else if (video_Ref.current.msRequestFullscreen) {
      video_Ref.current.msRequestFullscreen();
    }
    else{
      console.log("error")
    }
    setIsFullScreen(true);
  }
  const exitFullScreen=()=>{
    if(document.exitFullscreen){
      document.exitFullscreen();
      setIsFullScreen(false);
    }
    else if(document.webkitExitFullscreen){
      document.webkitExitFullscreen();
      setIsFullScreen(false);
    }
    else if(document.msExitFullscreen){
      document.msExitFullscreen();
      setIsFullScreen(false);
    }
    else{
      console.log("error")
    }
   
  }
  useEffect(() => {
    if(stream.data){
      const url=stream.data?.find((file)=>file.quality===quality)?.url;
      setVideoUrl(url);
    }
  }, [quality, stream.data]);
  if(isLoading || stream.data===undefined|| stream.isPending || stream.isLoading) {
    <Spinner/>
  }
  return (
    <div className="component__wrapper">
    <div className="player__wrappper" ref={video_Ref}>
    <ReactPlayer 
    url={videoUrl}
    width='100%' 
    height="100%" 
    ref={videoRef} 
    playing={playing}
    volume={volume}
    onProgress={handleProgress}
    onDuration={(duration)=>setDuration(duration)}>
    </ReactPlayer>
    <div className="controls">
      <div className="progress">
        <div className="loaded" style={{width:`${loaded}%`}}></div>
        <div className="progress__current" style={{width:`${progress}%`}}></div>
      </div>
      <div className="advance">
        <div>
      {playing?<IoIosPause onClick={play} className="play_pause __option"/>:<IoIosPlay onClick={play} className="play_pause __option"/>}
      <span className="time">
      {formatTime(played)} / {formatTime(duration)}
      </span>
      </div>
      <div className="control__options">
        <TbRewindBackward10 className="__option"/>
        <TbRewindForward10 className="__option"/>
        <div className="sound__box">
          {
          volume===0?
          <BiSolidVolumeMute className="__option speaker"/>:
          <GiSpeaker className="__option speaker"/>
          }
          <div className="range">
            <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e)=>setVolume(e.target.value)}/>  
          </div>
        </div>
        {
          !isFullScreen?
          <MdOutlineFullscreen onClick={fullScreen} className="__option"/>:
          <MdOutlineFullscreenExit  onClick={exitFullScreen} className="__option"/>
        }
      </div>
      </div>
    </div>
    
    </div>
   
    <div className="quality__wrapper" style={{color:"#fff"}}>
      <div className="quality__title">Quality : </div>
      <span className="quality__buttons">
          {
          stream.data?.map((file, idx) => (
            <button
              onClick={() => setQuality(file.quality)}
              className={`quality__button ${file.quality === quality && "active"}`}
              key={idx}
            >
              {file.quality}
            </button>
           ))
          }
      </span>
      </div>
    </div>
  )
}

VideoPlayer.propTypes = {
  episodeId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default VideoPlayer