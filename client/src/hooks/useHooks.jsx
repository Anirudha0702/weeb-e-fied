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
          console.log(query.data)
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
async function getAnimeInfo(id,provider){
  let res="";
  if(provider==='kitsu'){
    res= await axios.get(`${import.meta.env.VITE_KITSU_API}/anime/${id}`)
    let info=res.data;
    return {
      title:info.data.attributes.titles.en || info.data.attributes.titles.en_jp || info.data.attributes.titles.ja_jp,
      poster_image:info.data.attributes.posterImage.original || info.data.attributes.posterImage.large || info.data.attributes.posterImage.medium || null,
      cover_image:info.data.attributes.coverImage.original || info.data.attributes.coverImage.large || info.data.attributes.coverImage.medium || null,
      description:info.data.attributes.description || info.data.attributes.synopsis || null,
      status:info.data.attributes.status,
      rating:parseFloat(info.data.attributes.averageRating/10).toFixed(2),
      showType:info.data.attributes.showType,
      aired:info.data.attributes.startDate || 'NA',
      ageRating:info.data.attributes.ageRating,
      totalEps:info.data.attributes.episodeCount || 'NA',
      youtubeTrailer:info.data.attributes.youtubeVideoId || null,
      genres:await getGenres(info.data.relationships.genres.links.related),
    }
  }
  if(provider==='jikan'){
    res= await axios.get(`${import.meta.env.VITE_JIKAN_API}/anime/${id}`)
    let info=res.data.data;
    return {
      title:info.title || info.title_english || info.title_japanese || null,
      poster_image:info.images.jpg?.image_url || info.images.jpg?.small_image_url || info.images.jpg?.large_image_url || null,
      cover_image:info.images.jpg?.large_image_url || info.images.jpg?.image_url || info.images.jpg?.small_image_url || null,
      status:info.status,
      rating:info.score,
      showType:info.type,
      aired:info.aired.string,
      ageRating:info.rating,
      totalEps:info.episodes,
      youtubeTrailer:info.trailer_url,
      genres:info.genres.map(genre=>genre.name),
    }
  
  }
}
async function getGenres(url){
  console.log(url)
  const res=await axios.get(url);
  const genres=res.data.data;
  return genres.map(genre=>genre.attributes.name);
}