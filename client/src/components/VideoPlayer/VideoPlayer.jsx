import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Spinner from "../Loaders/Spinner/Spinner";
import { useStream } from "../../hooks/useHooks";
import { BiError } from "react-icons/bi";
const VideoPlayer = ({episodeId,isLoading,isError}) => {
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
    if(stream.data?.data){
      const url=stream.data?.data.find((file)=>file.quality===quality)?.url;
      setVideoUrl(url);
    }
  }, [quality,stream.data]);

  const saveProgress=(time)=>{
    localStorage.setItem(`${episodeId}`, time);
  }
  if(!stream.isIdle||stream.isPending || stream.isLoading) {
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
    <div className="relative flex flex-col h-full overflow-hidden gap-2 bg-black my-2">
    <div className="relative w-full h-[90%] " >
    {
      isError ? (
        <div className="error">
          <BiError/><span>Try after sometime</span>
        </div>
      ):isLoading?(<div className="">
      <Spinner/>
    </div>):
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
      ):<div className="error">
      <BiError/><span>Try after sometime</span>
    </div>
}
    </div>
   
    <div className="flex gap-1 items-center px-4 " >
      <div className="quality__title">Quality : </div>
      <span className="flex gap-2 flex-wrap">
          {
          stream.data?.data.map((file, idx) => (
            <button
              onClick={() => setQuality(file.quality)}
              className={`text-sm md:text-xl bg-white border-none px-2 py-1 text-black  ${file.quality === quality && "bg-yellow-500"}`}
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
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

export default VideoPlayer