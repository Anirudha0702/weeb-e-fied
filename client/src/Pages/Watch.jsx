import React, { useEffect,useState } from 'react';
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer/VideoPlayer" 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const Watch = () => {
  const [streamURL, setStreamURL] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const param = useParams();
  const info=useQuery(
    {
        queryKey:["search", param.name], 
        queryFn:async () => {
            const response = await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/search/${param.name}`);
            return response.data[0];
          }
    });
    
    const animeId=info?.data?.id;
    const stream=useQuery(
      {
          queryKey:["watch", `${animeId}/${selectedEpisode}`], 
          queryFn:async () => {
              const response = await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/watch/${animeId}/${selectedEpisode}`);
              return response.data;
            },
            enabled: !!animeId 
      }
    
  );
      useEffect(() => {
        console.log(stream)
        setStreamURL(stream.data);
      }, [stream]);
      if(stream.isError){
        return <div style={{background:"red"}}>error Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque reprehenderit ipsa quo dolorum enim officia aspernatur vitae expedita praesentium recusandae nulla minima, soluta placeat atque magnam, officiis beatae consequuntur sit!</div>
      }
      if(stream.isSuccess){
  return (
    <VideoPlayer url={streamURL}/>
  );}
}

export default Watch;
