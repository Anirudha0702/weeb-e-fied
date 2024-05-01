import { useState, useEffect, useContext } from "react";
import { Auth } from "../../Provider/AuthProvider";
import signIn from "../../utils/signIn";
import { addToList, getStatus, updateStatus } from "../../utils/watchListMethods";
import { useRef } from "react";
import PropTypes from "prop-types";
const WatchStatus = ({
  id,
  title,
  poster_image,
  ageRating,
  totalEps,
  showType,
  provider
}) => {
  const { currentUser } = useContext(Auth);
  const [currentStatus, setCurrentStatus] = useState("none");
  const ref= useRef(null)
  useEffect(()=>{
    const fetchData = async () => {
        if(currentUser){
          const res = await getStatus(currentUser.uid,`${id}__${provider}`);
        setCurrentStatus(res.status); 
        }
  
    };
    fetchData();
  },[currentUser, id, provider])
  const handleAddList = async () => {
    if (!currentUser) {
      await signIn();
    }
    await addToList(currentUser.uid, {
      id,
      title,
      poster_image,
      ageRating,
      totalEps,
      showType,
      provider
    });
    setCurrentStatus("Watching")
  };
  const onOptionChangeHandler = async (event) => {
      ref.current.disabled=true;
      const val=event.target.value
      await updateStatus(currentUser.uid,`${id}__${provider}`,val);
      ref.current.disabled=false

      setCurrentStatus(val)
  };

  return (
    <div>
      {currentStatus === "none" || currentStatus===undefined || currentStatus===null ? (
        <button className="px-2 py-1 border border-red-600 rounded-lg cursor-pointer transitian-all duration-300 bg-red-600 color-white" onClick={handleAddList}>
          Add to List
        </button>
      ) : (
        <select
          name=""
          id=""
          value={currentStatus}
          ref={ref}
          className="select select-info w-full max-w-xs"
          onChange={onOptionChangeHandler}
        >
          <option value="Watching">Watching</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
          <option value="Planned">Planned</option>
          <option value="On-Hold">On-Hold</option>
        </select>
      )}
    </div>
  );
};
WatchStatus.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  poster_image: PropTypes.string,
  ageRating: PropTypes.string,
  totalEps: PropTypes.number,
  showType: PropTypes.string,
  provider: PropTypes.string
};
export default WatchStatus;
