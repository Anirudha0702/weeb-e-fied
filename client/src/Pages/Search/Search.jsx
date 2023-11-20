
import { Link, useParams } from "react-router-dom"
import { useSearch } from "../../hooks/useHooks"
import '../../components/Featured/Featured.css'
const Search = () => {
  const param=useParams()
  const search=useSearch(param?.key)
  console.log(search)
if(search.isLoading || search.isPending){
    return <div>Loading...</div>
}
return (
<div className="featured__animes">
    {
        search?.map((anime,idx)=>{
            return(
                <Link to={`/details/${anime.id}?provider=kitsu`} key={idx}>
                    <div className="featured__anime" key={idx}>
                    <img 
                    src={
                        anime?.image
                        } alt={anime.title}/>
                    <h3>{anime.title}lll</h3>
                </div>
                </Link>
            )
        })
    }
</div>)
}

export default Search