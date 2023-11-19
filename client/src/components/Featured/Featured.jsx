import { getFeaturedAnime } from '../../Api/Jikan'
import './Featured.css'
import {useQuery} from '@tanstack/react-query'
import { Link } from 'react-router-dom'
const Featured = () => {
    const {data,isLoading,isPending}=useQuery(
        {
            queryKey:['featured'],
            queryFn:getFeaturedAnime
        }
    )
    if(isLoading || isPending){
        return <div>Loading...</div>
    }
  return (
    <div className="featured__animes">
        {
            data?.map((anime,idx)=>{
                return(
                    <Link to={`/details/${anime.mal_id}?provider=jikan`} key={idx}>
                        <div className="featured__anime" key={idx}>
                        <img 
                        src={
                            anime?.images?.jpg?.image_url||
                            anime?.images?.jpg?.small_image_url||
                            anime?.images?.jpg?.large_image_url
                            } alt={anime.title}/>
                        <h3>{anime.title}</h3>
                    </div>
                    </Link>
                )
            })
        }
    </div>
  )
}

export default Featured