import './SearchByGenre.css'
import Genres from '../../Data/Genre'
import getRandomColor from '../../utils/getRandomColor'
import { useNavigate } from 'react-router-dom'
const SearchByGenre = () => {
  const navigate=useNavigate();
  const handleSearh = (e) => {
    const genre = e.target.innerText
    navigate(`/search/${genre}`)
  }
  return (
    <div className="genre__wrapper">
      {
        Genres?.map((genre, index) => {
          return(
            <span key={index} className="genre" style={{color:getRandomColor()}} onClick={handleSearh}>{genre}</span>
          )
        })
      }
    </div>
  )
}

export default SearchByGenre