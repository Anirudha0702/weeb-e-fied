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