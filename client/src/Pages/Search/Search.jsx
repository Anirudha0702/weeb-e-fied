
import { Link, useParams } from "react-router-dom"
import { useSearch } from "../../hooks/useHooks"
import './Search.css'
const Search = () => {
  const param=useParams()
  const search=useSearch(param?.key,'jikan')
  console.log(search)
  if(search.error){
    console.log(search.error)
      return <div style={{color:'#fff'}}>error:{search.error.message}</div>
  }
if(search.isLoading || search.isPending){
    return <div>Loading...</div>
}
console.log(search)
return (
<div className="search__animes" data-key={param?.key} data-found={search?25:0}>
    {
        search?.map((anime,idx)=>{
            return(
                <Link to={`/details/${anime.mal_id}?provider=jikan`} key={idx}>
                    <div className="search__anime" key={idx}>
                    <img 
                    src={
                        anime.images.jpg?.image_url || anime.images.jpg?.small_image_url || anime.images.jpg?.large_image_url || null
                        } 
                    alt={
                        anime.title || 
                        anime.title_english || 
                        anime.title_japanese || null
                        }/>
                    <h3>{
                            anime.title || 
                            anime.title_english || 
                            anime.title_japanese || null
                        }</h3>
                </div>
                </Link>
            )
        })
    }
</div>)
}

export default Search