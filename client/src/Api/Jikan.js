import axios from 'axios'
export const getFeaturedAnime = async() => {
    const response = await axios.get(`${import.meta.env.VITE_JIKAN_API}/top/anime?filter=favorite`)
      if (response.status === 429) {
        const secondsToWait = Number(response.headers.get("retry-after"))
        await new Promise(resolve => setTimeout(resolve, secondsToWait * 1000))
        return getFeaturedAnime()
      }
      return response.data?.data;
    
}