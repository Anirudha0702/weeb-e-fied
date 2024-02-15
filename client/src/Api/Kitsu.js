import axios from 'axios';
import TopAnimes from '../Data/TopAnimes';
export async function getRecentAnimes(){
    try{
      const res=await axios.get(`${import.meta.env.VITE_KITSU_API}/anime?filter[status]=current&page[limit]=8&sort=-averageRating`)
      return res.data;      
    }
    catch(error){
      return { TopAnimes };
    }
  
}
export async function getTrendings(){
  try{
    const res=await axios.get(`${import.meta.env.VITE_KITSU_API}/trending/anime`)
    return res.data.data;      
  }
  catch(error){
    console.log(error)
    return { TopAnimes };
  } 
}
export async function getUpcomingAnimes(){
  try{
    const res=await axios.get(`${import.meta.env.VITE_KITSU_API}/anime?filter[status]=upcoming&page[limit]=8&sort=-averageRating`)
    return res.data;      
  }
  catch(error){
    return { TopAnimes };
  }
}
export async function getTopRatedAnimes(){
  try{
    const res=await axios.get(`${import.meta.env.VITE_KITSU_API}/anime?sort=-averageRating&page[limit]=8`)
    return res.data;      
  }
  catch(error){
    return { TopAnimes };
  }
}
export async function getMostFavoritedAnimes(){
  try{
    const res=await axios.get(`${import.meta.env.VITE_KITSU_API}/anime?sort=-favoritesCount&page[limit]=8`)
    return res.data;      
  }
  catch(error){
    return { TopAnimes };
  }

}
export async function searchByName(name){
  const res=await axios.get(`${import.meta.env.VITE_KITSU_API}/anime?filter[text]=${name}`);
  return res.data?.data;
}
export async function getAnimeInfo(id,provider){
  const res= await axios.get(`${import.meta.env.VITE_KITSU_API}/anime/${id}`)
  let info=res.data;
  return {
    id:id,
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
    provider:provider,
    genres:await getGenres(info.data.relationships.genres.links.related),
  }
}
async function getGenres(url){
  const res=await axios.get(url);
  const genres=res.data.data;
  return genres.map(genre=>genre.attributes.name);
}

// Upcoming Animes
// https://kitsu.io/api/edge/anime?filter[status]=upcoming
// Top Rating
// https://kitsu.io/api/edge/anime?sort=-averageRating
// MOst Favorites
// https://kitsu.io/api/edge/anime?sort=-favoritesCount