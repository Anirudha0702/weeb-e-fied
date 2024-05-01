import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import { FaPlayCircle } from "react-icons/fa";
import Spinner from "../../components/Loaders/Spinner/Spinner";
import { useInfo, useSearch } from "../../hooks/useHooks";
import getRandomColor from "../../utils/getRandomColor";
import { BiError } from "react-icons/bi";
const Watch = () => {
  const param = useParams();
  useEffect(() => {
    document.title = `${param.name} | Weeb-e-fied`;
  }, [param.name]);
  const result = useSearch(param.name.replace('.'," "), "weeb-e-fied");

  const animeId = result?.success ? result.data?.id : "error";
  // const lastEp = localStorage.getItem(`${animeId}`);
  const [selectedEpisode, setSelectedEpisode] = useState("1");
  const { isLoading, isError, isPending, data:info ,error} = useInfo(animeId);
  console.log(info,error)
 
  const mask={
    backgroundColor:'rgba(0,0,0,0.7)',
    backgroundImage: `url(${info?.data?.image})`,
    backgroundSize:'cover',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat',
    filter:'grayScale(1) opacity(0.3)',
    
  }

  const PlayVideo = (e, ep) => {
    e.preventDefault();
    localStorage.setItem(`${animeId}`, ep);
    setSelectedEpisode(ep);
  };
  return(
    <>
    <div className="text-gray-300 text-2xl px-4 line-clamp-1">
      {`Watching ${param.name}`}
    </div>
    <div className="w-full   max-w-5xl mx-auto">
      <div className="w-full h-[30rem] md:h-[80svh] ">
        <VideoPlayer episodeId={info?.data?.episodes[selectedEpisode-1]?.id} isLoading={isLoading} isError={isError}/>
      </div>
      <div className="w-full max-h-80 overflow-y-scroll h-fit my-4">
        {
          info?.data?.episodes?.map((episode, index) => {
            return (
              <div     
                className={`h-10 flex items-center justify-between px-2 text-xl w-full  odd:bg-gray-600 ${
                  selectedEpisode === episode.number ? "bg-gray-400 text-black" : ""
                } cursor-pointer hover:bg-gray-200 hover:text-black`}
                key={index}
                onClick={(e) => PlayVideo(e, episode.number)}
              >
                {`Episode ${episode.number}`}
                {selectedEpisode == episode.number ? <FaPlayCircle /> : ""}
              </div>
            );    })
        }
      </div>
      <div className="h-fit relative flex items-center justify-start flex-wrap gap-4">
       <div className="absolute h-full w-full" style={mask}></div>
        
          <img src={info?.data?.image} alt="" className="h-40 w-28 mx-3 my-3" style={{filter:'brightness(1)'}}/>
          <div className="my-4">
            <div className="text-2xl font-bold mx-3">{info?.data?.title}</div>
            <div className="text-lg mx-3">{info?.data?.description}</div>
            {
              info?.data?.genres?.map((genre,index)=>{
                return <span key={index} className="text-sm  ml-3 text-gray-300 px-2 py-1 rounded-md">{genre}</span>
              })
            }
          </div>
       
      </div>
    </div>
    </>
  )
};

export default Watch;
