import { useContext, useEffect, useState, useRef } from "react";
import getUser from "../../utils/getUser";
import "./Profile.css";
import { Auth } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import Spinner from "../../components/Loaders/Spinner/Spinner";
import { useUserList } from "../../hooks/useHooks";
import { BsThreeDots } from "react-icons/bs";
const Profile = () => {
  const { currentUser } = useContext(Auth);
  const navigate = useNavigate();
  const [option, setOption] = useState("All");
  const [user, setUser] = useState({});
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const { data, isLoading, isError } = useUserList(currentUser.uid, option);

  useEffect(() => {
    document.title = `Profile | Weeb-e-fied`;
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const user = async () => {
      setLoading(true);
      const data = await getUser(currentUser.uid);
      setLoading(false);
      setUser(data);
    };
    if (currentUser) {
      user();
    }
  }, [currentUser]);

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

  if (loading) {
    return (
      <div className="hero">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="cover-image-wrapper">
        <img src={user?.coverURL} alt="cover" />
      </div>
      <div className="profile-wrapper">
        <div className="profile-section">
          <div className="profile-image-wrapper">
            <img src={user?.photoURL} alt="" className="profile-image" />
          </div>
        </div>
        <div className="info-wrapper">
          <h1>
            {user?.displayName} <MdVerified style={{ color: "#5eff00" }} />
          </h1>
          <p>{user?.email} </p>
          <p>joined Since: {user?.createdAt?.toDate().toDateString()}</p>
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

export default Profile;
