import axios from 'axios';
import TopAnimes from '../Data/TopAnimes';
export async function getRecentAnimes(){
    const res=await axios.get(`${import.meta.env.VITE_KITSU_API}?filter[status]=current&page[limit]=10&sort=-averageRating`)
    .catch((error) => {
        return { TopAnimes };
      });
     return res.data;      
  
}