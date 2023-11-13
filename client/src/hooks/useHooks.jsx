import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const requestHandeler = async (endpoint) => {
  const res=await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/${endpoint}`);
  return res.data;
}
export function useSearch(name) {
    const query= useQuery(
        {
            queryKey:["search", name], 
            queryFn: async() => {
                return requestHandeler(`search/${name}`)
              },
              enabled:!!name
        });
        if (query.isLoading) {
            return {isLoading:query.isLoading};
          }
        
          if (query.isError) {
            return { error: query.isError };
          }
          return query.data;
}
export function useInfo(animeId) {
  const query=useQuery({
    queryKey:["info", animeId], 
    queryFn:async () => {
      return requestHandeler(`info/${animeId}`)
    },
    enabled: !!animeId
  })
  if (query.isLoading) {
      return {isLoading:query.isLoading};
    }
        
  if (query.isError) {
    return { error: query.isError };
    }
  return {
    data:query.data,
    isLoading:query.isLoading,
    isPending:query.isPending,
  };
}
export function useStream(episodeId){
    const query= useQuery(
        {
            queryKey:["watch", `episode-${episodeId}`], 
            queryFn:async () => {
                return requestHandeler(`watch/${episodeId}`)
              },
              enabled: !!episodeId
        }
    );
      return query;
}