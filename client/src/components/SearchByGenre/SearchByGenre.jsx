import './SearchByGenre.css'
import Genres from '../../Data/Genre'
import getRandomColor from '../../utils/getRandomColor'
const SearchByGenre = () => {
  return (
    <div className="genre__wrapper">
      {
        Genres?.map((genre, index) => {
          return(
            <span key={index} className="genre" style={{color:getRandomColor()}}>{genre}</span>
          )
        })
      }
    </div>
  )
}

export default SearchByGenre