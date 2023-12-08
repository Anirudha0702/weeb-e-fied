import './Community.css'
import { useState } from 'react';
import Cover from '../../assets/community-header.jpg'
import { GoPlus } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import { FaRegHeart,FaCommentAlt } from "react-icons/fa";
import TopCharacters from '../../components/TopCharacters/TopCharacters';
import Post from '../../components/Post/Post';
import getPosts from '../../Api/getPosts';
import {useInfiniteQuery,} from '@tanstack/react-query'
import Modal from '../../components/Modal/Modal';
const Community = () => {
  const [open,setOpen]=useState(false)
 const {data,isLoading,isPending,isError,status}=useInfiniteQuery(
    {
      queryKey:["posts"],
      queryFn:getPosts,
      getNextPageParam:(lastPage)=>{
        if(lastPage?.totalPages===lastPage?.currentPage) return false;
        return lastPage?.currentPage+1
      }
    }
  
 )
if(isLoading || isPending){
    return <div>Loading...</div>
}
if(isError || status==="idle" ){
    return <div>Error</div>
}
  return (
    <div className="community-page">
    <header className="community-header">
    <img src={Cover} alt="" className="cover-image" />
    <span className="text">Weeb-e-fied Connect</span>
    </header>
    
    <div className="section-wrapper">
        
        <div className="posts-wrapper">
        <div className="post-options">
        <button className="create-post _option" onClick={()=>setOpen(true)}>
            Create Post
            <GoPlus className="plus-icon" />
        </button>
        <button className="All  _option">
            All
        </button>
        <button className="my-posts  _option">
            My Posts
        </button>
        {
          open && <Modal close={setOpen}/>
        }
    </div>
      {
        data?.pages[0]?.data?.map((post)=><Post post={post} key={post?._id}/>)
      }
        </div>
        <TopCharacters/>
    </div>
    </div>
  )
}

export default Community