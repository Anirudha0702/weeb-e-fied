
import { Link, useParams } from "react-router-dom"
import { useSearch } from "../../hooks/useHooks"
import Spinner from "../../components/Loaders/Spinner/Spinner"
import './Search.css'
import SearchError from "../../components/Errors/SearchError/SearchError"
const Search = () => {
  const param=useParams()
  const search=useSearch(param?.key,'jikan')
  if(search.error){
    console.log(search.error)
      return <div className="search__animes" style={{height:'90svh'}}>
      <SearchError/>
  </div>
  }
if(search.isLoading || search.isPending){
    return <div className="search__animes" style={{height:'90svh'}}>
        <Spinner/>
    </div>
}
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
        // <SearchError/>
    }
</div>)
}

export default Search