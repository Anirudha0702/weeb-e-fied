import PropTypes from 'prop-types'
import ReactDom from 'react-dom'
import './PostPortal.css'
import { IoMdSend } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { FaCommentAlt } from "react-icons/fa";
import {useMutation,useQueryClient,useQuery} from '@tanstack/react-query'
import { useContext,useState} from 'react';
import { Auth } from '../../Provider/AuthProvider';
import { v4 as uuid } from 'uuid';
import {getPost,like,comment,disLike} from '../../Api/weeb-e-fied.js';
import { MdOutlineCancel } from "react-icons/md";
const PostPortal = ({post_id,stateFn}) => {
  const queryClient=useQueryClient()
  const {currentUser}=useContext(Auth)
  const [processing,setProcessing]=useState(false)
  const [_comment,setComment]=useState('')
  const {data:post,isLoading,isPending,isError,status}=useQuery(
    {
      queryKey:["post_by_id", post_id],
      queryFn:async() => {
        return getPost(post_id)
      },
      enabled:!!post_id,
    }
  
 )
  const getFormattedDate=(dt)=>{
    const currentDate = new Date(dt);
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const meridian = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedDate = `${currentDate.toDateString()} ${hours}:${formattedMinutes}:${formattedSeconds} ${meridian}`;
    return formattedDate;
  }
  const likePost=useMutation({
    mutationFn:async({postId,likeInfo})=>{return like(postId,likeInfo)},
    onSuccess:()=>{
        queryClient.invalidateQueries('posts')
    }
})
const disLikePost=useMutation({
    mutationFn:async({postId,likeInfo})=>{return disLike(postId,likeInfo)},
    onSuccess:()=>{
        queryClient.invalidateQueries('posts')
    }
})
const commentPost=useMutation({
    mutationFn:async({postId,commentInfo})=>{return comment(postId,commentInfo)},
    onSuccess:()=>{
        queryClient.invalidateQueries('posts')
    }
})
const handleLikeDislike=(e)=>{
    e.stopPropagation()
    setProcessing(!processing)
    if(processing) return
    const likeInfo={
        _likeId:uuid(),
        likedBy:currentUser?.uid,
        likerName:currentUser?.displayName,
        likedAt:new Date().toString()
    }
    if(post?.LikedBy?.some(element => element.likedBy === currentUser?.uid)){
        disLikePost.mutate({postId:post?._id,likeInfo},
            {
                onSuccess: () => {
                  setProcessing(false);
                },
              })
    }
    else {
        likePost.mutate({ postId: post?._id,likeInfo},
            {
                onSuccess: () => {
                  setProcessing(false);
                },
              })
    }
}
const handleComment=(e)=>{
    e.stopPropagation()
    console.log("cmt")
    const comment_obj={
        _commentId:uuid(),
        commentedBy:currentUser?.uid,
        commenterName:currentUser?.displayName,
        commentBody:_comment,
        commentedAt:new Date().toString()
    }
    commentPost.mutate(
        {postId:post?._id,commentInfo:comment_obj})
        setComment('')
}
  return ReactDom.createPortal(
<div className="user__post">
<div className="close-btn-post" onClick={()=>{stateFn(false)}}><MdOutlineCancel size={50} color="white"/></div>
<div className="post_portal post" >
            <div className="author">
                <div className="auther-image-wrapper">
                    <img src={post?.authorPhoto} alt="" className="auther-image"  referrerPolicy='no-referrer'/>
                </div>
                <h4 className="author-name">{post?.author}</h4>
                
            </div>
            <span className="post-body" >
                {post?.body}
            </span>
            
            <div className="post-actions">
                <button className={`like action ${processing?'disable':''}${post?.LikedBy?.some(element => element.likedBy === currentUser?.uid)?'red':''}`} onClick={e=>handleLikeDislike(e)}disabled={processing}><FcLike/>{post?.LikedBy?.length}</button>
                <button className="comment action"><FaCommentAlt/>{post?.Comments?.length}</button>
                <span className="created-at">{getFormattedDate(post?.createdAt)}</span>
            </div>
            <div className="write-comment-wraper">
                <input 
                type="text" 
                name="" id="" 
                className='cmt-inpt' 
                placeholder='Write a comment' 
                value={_comment} 
                onChange={e=>setComment(e.target.value)}/>
                <IoMdSend size={30} onClick={e=>handleComment(e)}/>
            </div>
            <div className="comments">
                {post?.Comments?.map((comment,index)=>(
                    <div className="comment" key={index}>
                        <h5 className="commenter-name">{comment?.commenterName}</h5>
                        <span className="comment-text">{comment?.commentBody}</span>
                    </div>
                ))}
            </div>
        </div>
</div>
  ,document.getElementById('show-post'))
  }
PostPortal.propTypes = {
    post_id: PropTypes.string.isRequired,
    stateFn: PropTypes.func.isRequired,
}

export default PostPortal