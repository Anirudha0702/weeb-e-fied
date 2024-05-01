import { GrPrevious, GrNext } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import { getTrendings } from "../../Api/Kitsu";
import { useRef } from "react";
import { Link } from "react-router-dom";
import CartLoader from "../Loaders/CartLoader/CartLoader";
const Trending = () => {
  const ref = useRef(null);
  const { isLoading, isPending, data } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrendings,
  });
  const btnpressprev = () => {
    let width = ref.current.clientWidth;
    ref.current.scrollLeft = ref.current.scrollLeft - width;
  };

  const btnpressnext = () => {
    let width = ref.current.clientWidth;
    ref.current.scrollLeft = ref.current.scrollLeft + width;
  };
  if (isLoading || isPending) {
    return (
      <div className="p-2 flex relative h-[15rem] md:h-[20rem] xl:h-[30vw] max-h-[20rem] gap-2">
        <CartLoader />
      </div>
    );
  }
  return (
    <div className="mt-20 flex relative h-[15rem] md:h-[20rem] xl:h-[30vw] max-h-[20rem]">
      <h3 className="absolute -top-12 block text-white font-medium text-2xl md:text-3xl  left-2">
        Trendings
      </h3>
      <div className="absolute right-0  flex-col gap-1 h-full w-10 sm:flex  hidden">
        <GrNext className="rounded-r-lg h-[49%] w-full cursor-pointer transition duration-300 ease-in-out bg-slate-900 text-gray-300 hover:bg-amber-200 hover:text-slate-900" onClick={btnpressnext} />
        <GrPrevious className="rounded-r-lg h-[49%] w-full cursor-pointer transition duration-300 ease-in-out bg-slate-900 text-gray-300 hover:bg-amber-200 hover:text-slate-900" onClick={btnpressprev} />
      </div>
      <div className="sm:w-[calc(100%-3rem)] h-full flex gap-2 sm:overflow-hidden scroll-smooth overflow-x-scroll w-full  " ref={ref}>
        {data?.map((item, idx) => {
          return (
            <Link to={`/details/${item.id}?provider=kitsu`} key={idx}>
              <div className="relative w-32 sm:w-[17vw] md:w-[15rem] shrink-0 h-full cursor-pointer rounded-md" key={idx}>
                <img
                  src={
                    item.attributes.posterImage.original ||
                    item.attributes.posterImage.large ||
                    item.attributes.posterImage.medium
                  }
                  alt="img"
                  className="w-full h-full absolute object-cover rounded-md"
                />
                <div className="absolute left-1 bottom-1 bg-slate-200 p-2 rounded-lg font-bold text-slate-700"># {idx + 1}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
