import PropTypes from 'prop-types'
import './Post.css'
import { FcLike } from "react-icons/fc";
import { FaCommentAlt } from "react-icons/fa";
import {useMutation,useQueryClient} from '@tanstack/react-query'
import like from '../../utils/like'
import { v4 as uuid } from 'uuid';
import { useContext,useState} from 'react';
import { Auth } from '../../Provider/AuthProvider';
import disLike from '../../utils/dislike';
import comment from '../../utils/comment';
import { IoMdSend } from "react-icons/io";
import PostPortal from '../PostPortal/PostPortal';
const Post = ({post})=> {
    const queryClient=useQueryClient()
    const {currentUser}=useContext(Auth)
    const [processing,setProcessing]=useState(false)
    const [showPost,setShowPost]=useState(false);
    const [_comment,setComment]=useState('')
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
      
  return (
    <>
    {
        showPost && <PostPortal post_id={post?._id} stateFn={setShowPost}/>
    }
    <div className="post" >
            <div className="author" onClick={()=>setShowPost(true)}>
                <div className="auther-image-wrapper">
                    <img src={post?.authorPhoto} alt="" className="auther-image"  referrerPolicy='no-referrer'/>
                </div>
                <h4 className="author-name">{post?.author}</h4>
                
            </div>
            <span className="post-body" onClick={()=>setShowPost(true)}>
                {post?.body}
            </span>
            
            <div className="post-actions">
                <button className={`like action ${processing?'disable':''} ${post?.LikedBy?.some(element => element.likedBy === currentUser?.uid)?'red':''}`} onClick={e=>handleLikeDislike(e)}disabled={processing}><FcLike/>{post?.LikedBy?.length}</button>
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
        </div></>
  )
}

Post.propTypes = {
    post:PropTypes.object.isRequired
}

export default Post