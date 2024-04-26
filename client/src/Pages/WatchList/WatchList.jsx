import { useContext, useEffect, useState, useRef } from "react";
import { Auth } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import CartLoader from "../../components/Loaders/CartLoader/CartLoader";
import { useUserList } from "../../hooks/useHooks";
import { BsThreeDots } from "react-icons/bs";
const WatchList = () => {
  const { currentUser } = useContext(Auth);
  const navigate = useNavigate();
  const [option, setOption] = useState("All");
  const SelectRef = useRef(null);
  const { data, isLoading, isError } = useUserList(currentUser.uid, option);

  useEffect(() => {
    document.title = `Profile | Weeb-e-fied`;
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const onOptionChangeHandler = async (event) => {
    SelectRef.current.disabled = true;
    const val = event.target.value;
    SelectRef.current.disabled = false;
    setOption(val);
  };

  const handleClcik = (e) => {
    const target = e.target;
    if (target.classList.contains("tab")) {
      const items = target.parentElement.children;
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("tab-active");
      }
      target.classList.add("tab-active");
      setOption(target.textContent);
    }
  };

  return (
    <div className="min-h-[80svh]">
      <div
        className="hero h-[15rem] md:h-[20rem] "
        style={{
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP6wKRFFLRIzs6zGoLCvOv2ZAmXKnSJfYRgt-F9W2Dwg&s)",
        }}
      >
        <div className="hero-overlay bg-opacity-70 h-[15rem] md:h-[20rem] "></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Hello, {currentUser?.displayName?.split(" ")[0]}
            </h1>
            <p className="mb-5">
              Explore our curated collection of captivating Save your favorite
              series and movies, create custom watchlistss, and keep track of
              what you have watched—all in one convenient place.
            </p>
          </div>
        </div>
      </div>
      <div
        role="tablist"
        className="border-t-1 my-4 tabs tabs-bordered hidden sm:grid mx-auto w-[90svw]"
        onClick={(e) => handleClcik(e)}
      >
        <a role="tab" className="tab tab-active">
          All
        </a>
        <a role="tab" className="tab ">
          Watching
        </a>
        <a role="tab" className="tab">
          Completed
        </a>
        <a role="tab" className="tab">
          Dropped
        </a>
        <a role="tab" className="tab">
          Planned
        </a>
        <a role="tab" className="tab">
          On-Hold
        </a>
      </div>
      <select
        name=""
        id=""
        value={option}
        ref={SelectRef}
        className="m-4 select select-primary w-1/4 sm:hidden"
        onChange={onOptionChangeHandler}
      >
        <option value="All">All</option>
        <option value="Watching">Watching</option>
        <option value="Completed">Completed</option>
        <option value="Dropped">Dropped</option>
        <option value="Planned">Planned</option>
        <option value="On-Hold">On-Hold</option>
      </select>
      <div className="flex flex-wrap mx-auto w-[95svw] gap-2 items-center justify-center">
        {isLoading && <CartLoader />}
        {isError && (
          <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
            Something went wrong
          </h1>
        )}
        {data?.length > 0 ? (
          data?.map((anime) => (
            <Link key={anime.id} to={`/details/${anime.id?.split("__")[0]}?provider=kitsu`}>
              <div className="relative w-40 h-60 md:w-60 md:h-[21rem] p-2 cursor-pointer ">
                <div className="relative w-full h-[calc(100%-2rem)]">
                  <img
                    src={anime.poster_image}
                    alt=""
                    className="absolute  w-full h-full object-cover"
                  />
                  <p className="age_rating_">{anime.ageRating}</p>
                </div>

                <BsThreeDots
                  className="absolute top-3 right-3 text-black"
                  size={25}
                />
                <div className="watchlist-anime-info">
                  <h4 className="line-clamp-1">{anime.title}</h4>
                  <div className="flex gap-2">
                    <p>{anime.showType} </p>
                    <p className="age_rating_">{anime.ageRating}</p>
                    CC:{anime.totalEps || "Unknown"}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
            Your watch list is Empty
          </h1>
        )}
      </div>
    </div>
  );
};

export default WatchList;
