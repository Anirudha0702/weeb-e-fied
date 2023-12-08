import "./VideoPlayer.css";
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Spinner from "../Loaders/Spinner/Spinner";
import { useStream } from "../../hooks/useHooks";
import { BiError, BiSolidVolumeMute } from "react-icons/bi";
// import { IoIosPlay,IoIosPause } from "react-icons/io";
// import { MdOutlineFullscreen ,MdOutlineFullscreenExit } 
// from "react-icons/md";
// import { GiSpeaker } from "react-icons/gi";
// import { TbRewindBackward10,TbRewindForward10 } from "react-icons/tb";
const VideoPlayer = ({episodeId,isLoading}) => {
  // const[isFullScreen, setIsFullScreen] = useState(false);
  // const play=()=>{
  //   setPlaying(!playing);
  
  // }
  // const formatTime=(seconds)=>{
  //   if(isNaN(seconds)){
  //     return "00:00";
  //   }
  //   const date=new Date(seconds*1000);
  //   const mm=date.getUTCMinutes();
  //   const ss=date.getUTCSeconds().toString().padStart(2,"0");
    
  //   return `${mm}:${ss}`
  // }
  // const handleProgress=(palyed)=>{
  //   setPlayed(palyed.playedSeconds);
  //   setProgress((played/duration)*100);
  //   setLoaded(palyed.loadedSeconds/duration*100);
  // }
  // const[duration,setDuration]=useState(0);
  // const[played,setPlayed]=useState(0);
  // const[progress,setProgress]=useState(0);
  // const[volume,setVolume]=useState(0.5);
  // const[loaded,setLoaded]=useState(0);
  // const[playing,setPlaying]=useState(true);
  const[quality, setQuality] = useState('default');
  const stream=useStream(episodeId); 
  const[videoUrl, setVideoUrl] = useState("");
  // const videoRef=useRef(0);
  const video_Ref=useRef(null);

  useEffect(() => {
    if(stream.data){
      const url=stream.data?.find((file)=>file.quality===quality)?.url;
      setVideoUrl(url);
    }
  }, [quality,stream.data]);
  if(!stream.isIdle||stream.isPending || stream.isLoading||isLoading ) {
    <div className="">
      <Spinner/>
    </div>
  }
  if(stream.isError){
    return <div className="error">
    <BiError/><span>Try after sometime</span>
    </div>
  }
  return (
    <div className="component__wrapper">
    <div className="player__wrappper" ref={video_Ref}>
    {
      ReactPlayer.canPlay(videoUrl)  ? (
        <ReactPlayer 
      url={videoUrl}
      width='100%' 
      height="100%" 
      controls={true}
      />
      ):(videoUrl==="" || videoUrl===undefined)?(<div className="">
      <Spinner/>
    </div>):
      (
        <div className="error">
          <BiError/><span>Try after sometime</span>
        </div>
      )
      
      // <div className="error">
      //   <BiError/><span>Try after sometime</span>
      // </div>
}
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