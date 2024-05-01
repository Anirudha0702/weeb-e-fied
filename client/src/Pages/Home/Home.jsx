import React,{ Suspense } from 'react'
const Hero = React.lazy(() => import('../../components/Hero/Hero'))
const Section = React.lazy(() => import('../../components/Section/Section'))
const Trending = React.lazy(() => import('../../components/Trending/Trending'))
import HomeLoader from '../../components/Loaders/HomeLoader/HomeLoader'
const Home = () => {
  return (
    <Suspense fallback={<HomeLoader/>}>
    <>
    <Hero/>
    <Trending/>
    <div className="bg-base-200 grid md:grid-cols-3 sm:grid-cols-2 gap-2 px-2 max-w-[90rem] mx-auto">
      <Section header="UpComing" className=""/>
      <Section header="TopRated" className=""/>
      <Section header="Favorites" className=" sm:col-span-2 md:col-auto"/>
    </div>
    </>
    </Suspense>
  )
}

export default Home