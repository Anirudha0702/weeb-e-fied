import Spinner from "../Spinner/Spinner"
import CartLoader from "../CartLoader/CartLoader"
import SectionLoader from "../SectionLoader/SectionLoader"
const HomeLoader = () => {
  return (
    <>
    <div className="relative h-80 md:h-[30rem] skeleton">
        <Spinner />
      </div>
      <div className="p-2 flex relative h-[15rem] md:h-[20rem] xl:h-[30vw] max-h-[20rem] gap-2">
        <CartLoader />
      </div>
      <div className="bg-base-200 grid md:grid-cols-3 sm:grid-cols-2 gap-2 px-2 max-w-[90rem] mx-auto">
        <SectionLoader/>
        <SectionLoader/>
        <SectionLoader/>
      </div>
    </>
  )
}

export default HomeLoader