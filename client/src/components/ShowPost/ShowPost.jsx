import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IoMdSend } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Auth } from "../../Provider/AuthProvider.jsx";
import { v4 as uuid } from "uuid";
import { getPost, like, comment, disLike } from "../../Api/weeb-e-fied.js";
const Comments=({Comments})=>{
  return(
    <div className="h-28 overflow-y-scroll">
      {
        Comments.map((comment,idx)=>(
          <div  key={comment?._commentId} className="flex gap-4 items-center">
          
            <div className="flex flex-col gap-4">
              <div className="h-4 text-lg font-bold">{comment.commenterName}</div>
              <div className="h-4 text-sm">{comment.commentBody}</div>
            </div>
          </div>
        ))
      }
    </div>
  )

}
const PostPortal = ({ post_id ,close_fn}) => {
  const Notify=(type,Message)=>{
    type==='error'?toast.error(Message):toast.success(Message)
  }
  const queryClient = useQueryClient();
  const { currentUser } = useContext(Auth);
  const [processing, setProcessing] = useState(false);
  const [_comment, setComment] = useState("");
  const {
    data: post,
    isLoading,
    isPending,
    isError,
    status,
  } = useQuery({
    queryKey: ["post_by_id", post_id],
    queryFn: async () => {
      return getPost(post_id);
    },
    enabled: !!post_id,
  });
  console.log(post)
  const getFormattedDate = (dt) => {
    const date = new Date(dt);
    return date.toDateString().slice(4);
  };
  const likePost = useMutation({
    mutationFn: async ({ postId, likeInfo }) => {
      return like(postId, likeInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  const disLikePost = useMutation({
    mutationFn: async ({ postId, likeInfo }) => {
      return disLike(postId, likeInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  const commentPost = useMutation({
    mutationFn: async ({ postId, commentInfo }) => {
      return comment(postId, commentInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      Notify('success','You commented on post')
    },
    onError: () => {
      Notify('error','unable o comment on post')
    },
  });
  const handleLikeDislike = (e) => {
    e.stopPropagation();
    setProcessing(!processing);
    if (processing) return;
    const likeInfo = {
      _likeId: uuid(),
      likedBy: currentUser?.uid,
      likerName: currentUser?.displayName,
      likedAt: new Date().toString(),
    };
    if (
      post?.LikedBy?.some((element) => element.likedBy === currentUser?.uid)
    ) {
      disLikePost.mutate(
        { postId: post?._id, likeInfo },
        {
          onSuccess: () => {
            setProcessing(false);
          },
        }
      );
    } else {
      likePost.mutate(
        { postId: post?._id, likeInfo },
        {
          onSuccess: () => {
            setProcessing(false);
          },
        }
      );
    }
  };
  const handleComment = (e) => {
    e.stopPropagation();
    setProcessing(true);
    const comment_obj = {
      _commentId: uuid(),
      commentedBy: currentUser?.uid,
      commenterName: currentUser?.displayName,
      commentBody: _comment,
      commentedAt: new Date().toString(),
    };
    commentPost.mutate({ postId: post?._id, commentInfo: comment_obj });
    setComment("");
    setProcessing(false);
  };

  if (isLoading || isPending || isError) {
    return (
      <dialog id="show-post" className="modal" open={true}>
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 items-center">
              <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full p-2">
              {isLoading
                ? "Loading..."
                : isPending
                ? "Pending..."
                : isError
                ? "Error..."
                : null}
            </div>
          </div>
        </div>
      </dialog>
    );
  }

  return (
    <dialog id="show-post" className="modal" open={true}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={()=>{close_fn(false)}}>
            ✕
          </button>
        </form>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4 items-center">
            <div className="avatar">
              <div className="w-20 rounded-full shrink-0">
                <img src={post?.authorPhoto} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className=" h-4 text-xl font-bold ">{post?.author}</div>
              <div className=" h-4 text-sm">
                {getFormattedDate(post?.createdAt)}
              </div>
            </div>
          </div>
          <div className=" h-fit p-2 w-full text-lg">
            {post?.body}
          </div>
          <div className="flex w-full px-2 justify-between items-center">
            <button className={`${processing?'cursor-progress':""} ${post?.LikedBy?.some(element => element.likedBy === currentUser?.uid)?'text-red-600':''} btn w-[49%]`}
            onClick={e=>handleLikeDislike(e)}
            disabled={processing}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {post?.LikedBy?.length}
            </button>
            <button className="btn w-[49%]">
              <FaCommentAlt size={20} />
              {post?.Comments?.length}
            </button>
          </div>
            <div className="flex gap-4 items-center">
              <div className="avatar">
                <div className="w-12 rounded-full shrink-0">
                  <img src={currentUser?.photoURL} />
                </div>
              </div>
              <input
                type="text"
                className="w-full p-2 border-2 border-gray-300 rounded-full bg-gray400"
                placeholder="Add a comment"
                value={_comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={processing}
              />
              <button
                className={`btn btn-md btn-circle ${processing?"cursor-not-allowed":""}`}
                onClick={(e) => handleComment(e)}
                disabled={processing}
              >
                <IoMdSend size={30} />
              </button>
            </div>
          {
            post?.Comments?.length>0 && <Comments Comments={post?.Comments}/>
            
          }
        </div>
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
        containerId="showPostToast"
      />
    </dialog>
  );
};
export default PostPortal;
