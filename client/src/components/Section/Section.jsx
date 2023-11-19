import Featured from '../Featured/Featured'
import SearchByGenre from '../SearchByGenre/SearchByGenre'
import './Section.css'
const Section = () => {
  return (
    <div className="section__wrapper">
        <Featured/>
        <SearchByGenre/>
    </div>
  )
}

export default Section