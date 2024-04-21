import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../Api/weeb-e-fied";
import { Auth } from "../../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Modal = () => {
  const Notify=(type)=>{
    type=='success'?toast.success("Posted Successfully"):toast.error("Cannot post some error occoured")
  }
  const { currentUser } = useContext(Auth);
  const queryClient = useQueryClient();
  const [msgLength, setMsgLength] = useState(0);
  const [postBody, setPostBody] = useState("");
  const { mutate } = useMutation({
    mutationFn: async (post) => {
      return  createPost(post);
    },
    onSuccess: () => {
      Notify('success');
      setPostBody("");
      setMsgLength(0);
      queryClient.invalidateQueries(['posts'])
    },
    onError: () => {
      Notify('error');
    },
  });
  const handleEvent = (e) => {
    if (postBody.length < 199) {
      setPostBody(e.target.value);
      setMsgLength(e.target.value.length);
    } else {
      window.alert("You can't send more than 200 characters");
    }
  };
  return (
    <dialog id="create-post" className="modal">
      <div className="modal-box">
        <form method="dialog" className="bg-red-400">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-xl mb-2 text-white">Create Post</h3>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-full h-40 p-2 resize-none rounded-md bg-gray-200 text-black"
          placeholder="What's on your mind?"
          value={postBody}
          onChange={(e) => handleEvent(e)}
        />
        <div style={{ color: msgLength >= 200 ? "red" : "white" }}>
          {`${msgLength}/200`}{" "}
        </div>
        <button
        disabled={msgLength < 1 || msgLength > 200}
          className={` w-full mt-2 p-2 rounded-md text-black text-xl bg-neutral-content ${msgLength < 1 || msgLength > 200?'cursor-not-allowed':''}`}
          onClick={() =>
            mutate({
              authorId: currentUser.uid,
              author: currentUser.displayName,
              authorPhoto: currentUser.photoURL,
              body: postBody,
              LikedBy: [],
              Comments: [],
            }) 
          }
        >
          Post
        </button>
      </div>
      <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
                pauseOnFocusLoss
                containerId="createPostToast"
            />
    </dialog>
  );
};
export default Modal;
