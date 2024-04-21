import PropTypes from "prop-types";
import { FcLike } from "react-icons/fc";
import { FaCommentAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { like, comment, disLike } from "../../Api/weeb-e-fied.js";
import { v4 as uuid } from "uuid";
import { useContext, useState } from "react";
import { Auth } from "../../Provider/AuthProvider";

import { IoMdSend } from "react-icons/io";
import ShowPost from "../ShowPost/ShowPost.jsx";
const Post = ({ post }) => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(Auth);
  const [processing, setProcessing] = useState(false);
  const [_comment, setComment] = useState("");
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
    console.log("cmt");
    const comment_obj = {
      _commentId: uuid(),
      commentedBy: currentUser?.uid,
      commenterName: currentUser?.displayName,
      commentBody: _comment,
      commentedAt: new Date().toString(),
    };
    commentPost.mutate({ postId: post?._id, commentInfo: comment_obj });
    setComment("");
  };
  const getFormattedDate = (dt) => {
    const date = new Date(dt);
    return date.toDateString().slice(4);
  };

  return (
    <>
      {show && <ShowPost post_id={post?._id} close_fn={setShow} />}

      <div className="relative w-[90%] mx-auto bg-gray-700 mb-4 flex min-h-20 rounded-xl">
        <div className="w-12 overflow-hidden flex flex-col gap-4 bg-gray-800 rounded-l-xl p-2 pt-6 relative">
          <button
            className={`flex flex-col items-center gap-1    ${
              processing ? "cursor-not-allowed" : ""
            } ${
              post?.LikedBy?.some(
                (element) => element.likedBy === currentUser?.uid
              )
                ? "red"
                : ""
            }`}
            onClick={(e) => handleLikeDislike(e)}
            disabled={processing}
          >
            <FcLike className="rounded-full " />
            {post?.LikedBy?.length}
          </button>

          <button
            className="flex  flex-col items-center gap-1 "
            onClick={() => {
              setShow(true);
            }}
          >
            <FaCommentAlt className="" />
            {post?.Comments?.length}
          </button>
        </div>
        <div className="w-full  h-full rounded-r-xl p-4 cursor-pointer">
          <div className="w-full"
          onClick={()=>setShow(true)}>
            <div className="flex items-center gap-2">
              <img
                src={post?.authorPhoto}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <h4 className="text-white">{post?.author}</h4>
              <span>{getFormattedDate(post?.createdAt)}</span>
            </div>
            <p className="text-white my-2">
            {post?.body.length > 200
                ? post?.body.slice(0, 200) + "..."
                : post?.body}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name=""
              id=""
              className="p-3  rounded-full flex-grow h-8 text-sm"
              placeholder="Write a comment"
              value={_comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <IoMdSend size={30} onClick={(e) => handleComment(e)} />
          </div>
        </div>
      </div>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
