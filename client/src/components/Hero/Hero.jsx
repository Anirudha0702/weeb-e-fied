import { getRecentAnimes } from "../../Api/Kitsu";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "./Hero.css";
import {
  FaCalendar,
  FaClock,
  FaPlayCircle,
} from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Spinner from "../Loaders/Spinner/Spinner";
const Hero = () => {
  const [current, SetCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      current === 0 ? SetCurrent(7) : SetCurrent(current + 1);
      current === 7 ? SetCurrent(0) : SetCurrent(current + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });
  const recentAnimes = useQuery({
    queryKey: ["recentAnimes"],
    queryFn: getRecentAnimes,
  });
  if (recentAnimes.isLoading) {
    return (
      <div className="relative h-80 md:h-[30rem]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" relative h-80 md:h-[30rem]">
      <div className="absolute z-10 w-full h-full bg-gradient-to-r from-black to-black/40 via-black/50"></div>
      <div className="h-full z-0">
        <img
          alt={recentAnimes.data[current].title}
          className={`object-cover w-full h-full ${
            current & (1 === 1) ? "fade_in" : "fade_out"
          }`}
          src={recentAnimes.data[current].poster}
        />
      </div>
      <div className="top-0 absolute z-20 flex flex-col items-start px-2 sm:px-10  justify-center w-full h-full text-white gap-4">
        <h1 className="text-3xl sm:text-5xl line-clamp-2 sm:line-clamp-none">
          {recentAnimes.data[current]?.title}
        </h1>
        <span className="line-clamp-2 sm:line-clamp-3 max-w-xl">
          {recentAnimes.data[current]?.background ||
            recentAnimes.data[current]?.synopsis}
        </span>
        <div className="flex gap-4 flex-wrap ">
          {
            recentAnimes.data[current]?.subType ? (
              <div className="flex gap-1 items-center">
                <FaPlayCircle />
                <span>{recentAnimes.data[current]?.subType}</span>
              </div>
            ):null
          }
          {
            recentAnimes.data[current]?.startDate ? (
              <div className="flex gap-1 items-center">
                <FaCalendar />
                <span>{recentAnimes.data[current]?.startDate}</span>
              </div>
            ):null
          }
          {
            recentAnimes.data[current]?.episodeLength ? (
              <div className="flex gap-1 items-center">
                <FaClock />
                <span>{recentAnimes.data[current]?.episodeLength}min</span>
              </div>
            ):null
          }
          {
            recentAnimes.data[current]?.episodeCount ? (
              <>
                <span className="flex gap-1 items-center">
                <span>{recentAnimes.data[current]?.episodeCount} Episodes</span>
              </span>
              <span>
                HD
              </span>
              </>
            ):null
          }
        </div>
        <div className="flex gap-2 sm:gap-6">
          
          <Link to={`/watch/${recentAnimes.data[current]?.title}`}
          className="flex items-center gap-1 bg-white text-black px-4 py-2 rounded-md">
          
              <FaPlayCircle />
              Watch Now

          </Link>
          <Link
            to={`/details/${recentAnimes.data[current]?.id}?provider=kitsu`}
            className="flex items-center gap-1 bg-white text-black px-4 py-2 rounded-md"
          >
            <BsFillInfoCircleFill />
            <span>More Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
