import { useParams, useSearchParams, Link } from "react-router-dom";
import { useAnimeById } from "../../hooks/useHooks";
import Spinner from "../../components/Loaders/Spinner/Spinner";
import { FaPlayCircle } from "react-icons/fa";
import getRandomColor from "../../utils/getRandomColor";
import noImage from "../../assets/no-image.webp";
import WatchStatus from "../../components/WatchStatus/WatchStatus";
const Details = () => {
  const param = useParams();
  const [query] = useSearchParams();

  const info = useAnimeById(param.name, query.get("provider"));
  
  
  const { id, title, poster_image, totalEps, showType, ageRating,provider } =info?.data??{};
  if (info.isLoading || info.isPending)
    return (
      <div className="" style={{ position: "relative", height: "90svh" }}>
        <Spinner />
      </div>
    );
  return (
    <div className="relative h-fit min-h-[80svh] w-full">
      <div className="relative w-full h-[60svh]">
        <img
          src={info?.data?.cover_image || noImage}
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="relative w-[90%] grid md:flex flex-wrap mx-auto mt-4 gap-2 text-white justify-start items-start py-4">
        <div className="flex w-fit -top-24 px-4 items-start justify-start gap-4 mt-4 relative">
          <div className="relative w-40 aspect-[2/3]">
            <img
              src={info?.data?.poster_image || noImage}
              alt=""
              className="absolute w-full h-full object-cover"
            />
          </div>
          <div className="relative -bottom-12 flex gap-4 grow pt-8 flex-col justify-start">
            <Link
              to={`/watch/${info.data?.title}`}
              style={{ padding: 0 }}
              className="_link"
            >
              <button className="btn btn-outline btn-accent">
              <FaPlayCircle size={14} />
                <p>Watch Now</p>
              </button>
            </Link>

            <WatchStatus
              {...{ id, title, poster_image, ageRating, totalEps, showType ,provider}}
            />
          </div>
        </div>
        <span className="min-w-80  flex flex-col gap-2 break-words w-full max-w-[40rem] text-slate-300">
          <h2  className="text-xl font-bold">{info.data?.title}</h2>
          <p>
            {info?.data?.description?.replace(/(\r\n|\n|\r)/gm, "") ||
              "No Description Available"}
          </p>
          <span className="flex gap-2">
            {info.data?.genres.map((genre, index) => (
              <span
                key={index}
                className="px-1"
                style={{ backgroundColor: getRandomColor() }}
              >
                {genre}
              </span>
            ))}
          </span>
        </span>
        <div className="mt-4 h-fit flex grow flex-col text-slate-300">
          <Link
            to={`https://youtube.com/watch?v=${info.data?.youtubeTrailer}`}
            className=""
          >
            <div
              className="flex w-full items-center justify-center py-1 gap-2 bg-center bg-cover"
              style={{ backgroundImage: `url('${info.data?.poster_image}')` }}
            >
              <FaPlayCircle size={50} />
              Play Trailer
            </div>
          </Link>
          <span className="mt-2 text-xl">Anime Details</span>
          <div className="mt-2  flex flex-col gap-2">
            <span className="_title px-2">Title: {info.data?.title}</span>
            <span className="_type px-2 text-base-100 bg-slate-400">Type: {info.data?.showType}</span>
            <span className="aired px-2">Aired: {info.data?.aired}</span>
            <span className="age_rating px-2 text-base-100 bg-slate-400">
              Age Rating: {info.data?.ageRating}
            </span>
            <span className="status px-2">Status: {info.data?.status}</span>
            <span className="totals_ep px-2 text-base-100 bg-slate-400">Episodes: {info.data?.totalEps}</span>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Details;
