import { useState, useEffect, useContext } from "react";

import { Auth } from "../../Provider/AuthProvider";
import "./WatchStatus.css";
import signIn from "../../utils/signIn";
import { addToList, getStatus, updateStatus } from "../../utils/watchListMethods";
import { useRef } from "react";
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
        <button className="add-to-list" onClick={handleAddList}>
          Add to List
        </button>
      ) : (
        <select
          name=""
          id=""
          value={currentStatus}
          ref={ref}
          className="bg-blue-400 w-24 rounded-lg p-2 hover:bg-blue-600 duration-200 ease-in-out h-full focus:outline-0"
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

export default WatchStatus;
