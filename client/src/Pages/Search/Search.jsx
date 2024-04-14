
import { Link, useParams } from "react-router-dom"
import { useSearch } from "../../hooks/useHooks"
import Spinner from "../../components/Loaders/Spinner/Spinner"
import './Search.css'
import { useState } from "react"

// https://kitsu.io/api/edge/anime?sort=-userCount&page[limit]=8
import SearchError from "../../components/Errors/SearchError/SearchError"
const Search = () => {
const [page,setPage]=useState(1)
  const param=useParams()
  const provider=param?.provider || 'kitsu'
  const search=useSearch(param?.key,provider)
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
<div className="search__animes" data-key={param?.key} data-found={search?search.length:0}>
    {
        search?.map((anime,idx)=>{
            let id,title,imagge
            if(provider==='jikan'){

                id=anime.mal_id
                title= anime.title || 
                anime.title_english || 
                anime.title_japanese || null
                imagge=anime.images.jpg.image_url || 
                anime.images.jpg.small_image_url || 
                anime.images.jpg.large_image_url || null
            }
            if(provider==='kitsu'){
                id=anime.id
                title=anime.attributes.titles.en || 
                anime.attributes.titles.en_jp || 
                anime.attributes.titles.ja_jp || null
                imagge=anime.attributes.posterImage.original || 
                anime.attributes.posterImage.large || 
                anime.attributes.posterImage.medium || null
            }
            return(
                <Link to={`/details/${id}?provider=${provider}`} key={idx}>
                    <div className="search__anime" key={idx}>
                    <img 
                    src={imagge} 
                    alt={title}/>
                    <h3>{title}</h3>
                </div>
                </Link>
            )
        })
        // <SearchError/>
    }
</div>)
}

export default Search