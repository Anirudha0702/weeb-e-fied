import { BsWechat } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Logo from "../../assets/de.png";
import { FaUserAlt } from "react-icons/fa";
import { AiFillSetting, AiFillHeart } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import { Auth } from "../../Provider/AuthProvider";
import signIn from "../../utils/signIn";
import signout from "../../utils/signOut";
const Nav = () => {
  const { currentUser } = useContext(Auth);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    await signIn();
  };
  const handleSearch = () => {
    navigate(`/search/${search}`);
  };
  return (
    <nav className="h-16 flex bg-base-200 items-center gap-2 justify-between px-2">
      <Link to={"/"}>
        <div className="w-16 aspect-square relative">
          <img
            src={Logo}
            className="object-cover absolute w-full h-full"
            alt="user Image"
          />
        </div>
      </Link>

      <label className="input input-bordered flex items-center gap-2 grow max-w-4xl">
        <input
          type="text"
          className="grow"
          placeholder="Search by  Anime name"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleSearch(e);
            }
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
          onClick={(e) => handleSearch(e)}
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      {currentUser !== null ? (
        <div className="flex gap-2 relative">
          <Link to={"/community"}>
            <BsWechat size={45} />
          </Link>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn relative w-12 h-12 rounded-full overflow-hidden"
            >
              <img
                src={currentUser?.photoURL}
                alt="user Image"
                className="object-cover absolute w-full h-full rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li
                className="py-2  flex items-center gap-2 cursor-pointer "
                onClick={() => {
                  navigate(`/user/`);
                }}
              >
                <span>
                  <FaUserAlt />
                  Profile
                </span>
              </li>
              <li
                className="py-2 px-4 flex items-center gap-2 cursor-pointer "
                onClick={() => {
                  navigate(`/user/${currentUser?.uid}/watchlist`);
                }}
              >
                <span>
                  <AiFillHeart className="" />
                  WatchList
                </span>
              </li>
              <li className="py-2 px-4 flex items-center gap-2 cursor-pointer ">
                <span>
                  <AiFillSetting className="" />
                  Settings
                </span>
              </li>
              <li
                className="py-2 px-4 flex items-center gap-2 cursor-pointer "
                onClick={async () => {
                  await signout();
                }}
              >
                <span>
                  <LuLogOut className="" />
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button className="btn btn-active btn-primary" onClick={handleSignIn}>
          Sign In
        </button>
      )}
    </nav>
  );
};

export default Nav;
