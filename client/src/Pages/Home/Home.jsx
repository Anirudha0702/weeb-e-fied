import Hero from '../../components/Hero/Hero'
import Section from '../../components/Section/Section'
import Trending from '../../components/Trending/Trending'
const Home = () => {
  return (
    <>
    <Hero/>
    <Trending/>
    <div className="bg-base-200 grid md:grid-cols-3 sm:grid-cols-2 gap-2 px-2 max-w-[90rem] mx-auto">
      <Section header="UpComing" className=""/>
      <Section header="TopRated" className=""/>
      <Section header="Favorites" className=" sm:col-span-2 md:col-auto"/>
    </div>
    </>
  )
}

export default Home