import { useQuery } from "@tanstack/react-query";
import { getAnimeInfo, getMostFavoritedAnimes, getTopRatedAnimes, getUpcomingAnimes, searchByName as kitsuSearch} from "../Api/Kitsu";
import { getStreamingLinks, searchByName as weebSearch,getAnimeInfo as weebInfo } from "../Api/weeb-e-fied";
import { getUserAnimeList } from "../utils/watchListMethods";
export function useSearch(name,provider) {
  console.log(name,provider)
    const query= useQuery(
        {
            queryKey:["search", name], 
            queryFn: async() => {
                return provider==='weeb-e-fied'?weebSearch(name):kitsuSearch(name)
              },
              enabled:!!name
        });
        if (query.isLoading) {
            return {isLoading:query.isLoading};
          }
        
          if (query.isError) {
            return { 
              error: query.error,
              isError:query.isError,
              };
          }
          return query.data;
}
export function useInfo(animeId) {
  const query=useQuery({
    queryKey:["info", animeId], 
    queryFn:async () => {
      return weebInfo(animeId)
    },
    enabled: !!animeId
  })
  return {
    data:query.data,
    isLoading:query.isLoading,
    isPending:query.isPending,
    isError:query.isError
  };
}
export function useStream(episodeId){
    const query= useQuery(
        {
            queryKey:["watch", `episode-${episodeId}`], 
            queryFn:async () => {
                return getStreamingLinks(`watch/${episodeId}`)
              },
              enabled: !!episodeId
        }
    );
      return query;
}
export function useAnimeById(id,provider){
  const query=useQuery(
    {
      queryKey:["anime-info",id,provider],
      queryFn:()=>{
        return getAnimeInfo(id,provider)
      },
      enabled:!!id && !!provider
    })
    return query;
  }
  
export function  useList(slug){
  const query=useQuery(
    {
      queryKey:["list",slug],
      queryFn:()=>{
        return slug==='upcoming'?getUpcomingAnimes():slug==='favorites'?getMostFavoritedAnimes():getTopRatedAnimes()
      },
      enabled:!!slug
    })
    return query;
}
export function useUserList(uid,status){
  const query=useQuery(
    {
      queryKey:["user-list",uid,status],
      queryFn:()=>{
        return getUserAnimeList(uid,status)
      },
      enabled:!!uid && !!status
    })
    return query;
}
