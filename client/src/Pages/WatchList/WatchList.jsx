import { useContext, useEffect, useState, useRef } from "react";
import { Auth } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Loaders/Spinner/Spinner";
import { useUserList } from "../../hooks/useHooks";
import { BsThreeDots } from "react-icons/bs";
const WatchList = () => {
  const { currentUser } = useContext(Auth);
  const navigate = useNavigate();
  const [option, setOption] = useState("All");
  const ref = useRef(null);
  const { data, isLoading, isError } = useUserList(currentUser.uid, option);

  useEffect(() => {
    document.title = `Profile | Weeb-e-fied`;
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const onOptionChangeHandler = async (event) => {
    ref.current.disabled = true;
    const val = event.target.value;
    ref.current.disabled = false;
    setOption(val);
  };

  const handleClcik = (e) => {
    const target = e.target;
    if (target.classList.contains("nav-item")) {
      const items = target.parentElement.children;
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
      }
      target.classList.add("active");
      setOption(target.textContent);
    }
  };

  if (isLoading) {
    return (
      <div className="hero">
        <Spinner />
      </div>
    );
  }

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
            <h1 className="mb-5 text-5xl font-bold">Hello, {currentUser?.displayName.split(" ")[0]}</h1>
            <p className="mb-5">
            Explore our curated collection of captivating Save your favorite series and movies, create custom watchlistss, and keep track of what you've watched—all in one convenient place.
            </p>
          </div>
        </div>
      </div>
      <nav className="watchlist-nav">
        <ul onClick={(e) => handleClcik(e)}>
          <li className="nav-item active">All</li>
          <li className="nav-item">Watching</li>
          <li className="nav-item">Completed</li>
          <li className="nav-item">Dropped</li>
          <li className="nav-item">Planned</li>
          <li className="nav-item">On-Hold</li>
        </ul>
      </nav>
      <select
        name=""
        id=""
        value={option}
        ref={ref}
        className="mob-watchlist-nav"
        onChange={onOptionChangeHandler}
      >
        <option value="All">All</option>
        <option value="Watching">Watching</option>
        <option value="Completed">Completed</option>
        <option value="Dropped">Dropped</option>
        <option value="Planned">Planned</option>
        <option value="On-Hold">On-Hold</option>
      </select>
      <div className="watchlist-animes">
        {isLoading && (
          <div className="hero">
            <Spinner />
          </div>
        )}
        {isError && (
          <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
            Something went wrong
          </h1>
        )}
        {data?.length > 0 ? (
          data?.map((anime) => (
            <div className="watchlist-anime" key={anime.id}>
              <div className="poster-wrapper">
                <img src={anime.poster_image} alt="" />
                <p className="age_rating_">{anime.ageRating}</p>
                <span className="episode__count__">
                  CC:{anime.totalEps || "Unknown"}
                </span>
              </div>
              <BsThreeDots className="three-dots" />
              <div className="watchlist-anime-info">
                <h4>{anime.title}</h4>
                <p>{anime.showType}</p>
              </div>
            </div>
          ))
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
            No Anime Found
          </h1>
        )}
      </div>
    </div>
  );
};

export default WatchList;
