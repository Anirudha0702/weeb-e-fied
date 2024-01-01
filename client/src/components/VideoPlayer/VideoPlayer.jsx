import "./VideoPlayer.css";
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Spinner from "../Loaders/Spinner/Spinner";
import { useStream } from "../../hooks/useHooks";
import { BiError } from "react-icons/bi";
const VideoPlayer = ({episodeId,isLoading}) => {
  const[quality, setQuality] = useState('default');
  const stream=useStream(episodeId); 
  const[videoUrl, setVideoUrl] = useState("");
  const video_Ref=useRef(null);
  const [seekTo,setSeekTo]=useState(localStorage.getItem(`${episodeId}`)||0);

  useEffect(() => {
    if(episodeId && localStorage.getItem(episodeId)===null){
      localStorage.setItem(`${episodeId}`, '0');
    }
    else{
      setSeekTo(localStorage.getItem(episodeId)); 
    }
  },[episodeId, seekTo,quality])
  useEffect(() => {
    if(stream.data){
      const url=stream.data?.find((file)=>file.quality===quality)?.url;
      setVideoUrl(url);
    }
  }, [quality,stream.data]);

  const saveProgress=(time)=>{
    localStorage.setItem(`${episodeId}`, time);
  }
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
    <div className="player__wrappper" >
    {
      ReactPlayer.canPlay(videoUrl)  ? (
        <ReactPlayer 
        ref={video_Ref}
        url={videoUrl}
        width='100%' 
        height="100%" 
        onReady={()=>video_Ref?.current?.seekTo(seekTo, 'seconds')}
        controls={true}
        playing={true}
        onProgress={e=>{if(e.playedSeconds>10)saveProgress(e.playedSeconds)}}
      />
      ):(videoUrl==="" || videoUrl===undefined)?(<div className="">
      <Spinner/>
    </div>):
      (
        <div className="error">
          <BiError/><span>Try after sometime</span>
        </div>
      )
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