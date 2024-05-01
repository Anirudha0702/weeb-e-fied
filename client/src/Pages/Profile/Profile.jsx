import { useContext, useEffect, useState } from "react";
import getUser from "../../utils/getUser";
import { Auth } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Loaders/Spinner/Spinner";
const Profile = () => {
  const { currentUser } = useContext(Auth);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
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
  const goToSetting = () => {
    navigate("/settings");
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
              Step into otaku world, where every frame tells a story, and every
              character captures our hearts.
            </p>
          </div>
        </div>
      </div>
      <h1 className="my-4 text-center text-5xl font bold">Profile</h1>

      {loading ? (
        <div className="relative h-80 md:h-[30rem] skeleton w-4/5 mx-auto">
          <Spinner />
        </div>
      ) : (
        <div className="mx-auto w-full max-w-[40rem]   h-fit flex flex-col items-center justify-center md:grid md:grid-cols-[3fr_1fr] gap-4 bg-gray-700 my-12">
          <div className="w-full flex flex-col items-center justify-center  p-4 gap-2 md:bg-gray-800 order-2 md:order-1">
            <label className="form-control w-full ">
              <div className="label">
                <span className="text-base  font-bold ">Username</span>
              </div>
              <input
                type="text"
                value={user?.displayName}
                className="input input-bordered w-full  cursor-text bg-white text-gray-600"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-base font-bold ">Email</span>
              </div>
              <input
                type="text"
                value={user?.email}
                className="input input-bordered w-full  cursor-text bg-white  text-gray-600"
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="text-base font-bold ">Joined</span>
              </div>
              <input
                type="text"
                value={user?.createdAt?.toDate().toDateString()}
                className="input input-bordered w-full  cursor-text bg-white  text-gray-600"
              />
            </label>
            {/* <button className="btn btn-wide mx-auto flex mt-4 bg-" onClick={goToSetting}>Edit Profile</button>*/}
          </div>
          <div className="avatar  order-1 mt-4">
            <div className="w-24 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
