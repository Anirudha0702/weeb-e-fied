import Hero from '../../components/Hero/Hero'
import Section from '../../components/Section/Section'
import Trending from '../../components/Trending/Trending'
import './Home.css'
const Home = () => {
  return (
    <>
    <Hero/>
    <Trending/>
    <div className="section__wrapper">
      <Section header="UpComing" className="upcoming"/>
      <Section header="TopRated" className="toprated"/>
      <Section header="Favorites" className="favorites"/>
    </div>
    </>
  )
}

export default Home