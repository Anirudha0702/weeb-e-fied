import './Community.css'
import { useState,useEffect,useContext } from 'react';
import Cover from '../../assets/community-header.jpg'
import { GoPlus } from "react-icons/go";
import TopCharacters from '../../components/TopCharacters/TopCharacters';
import { IoIosArrowForward ,IoIosArrowBack} from "react-icons/io";
import Post from '../../components/Post/Post';
import { getPosts } from '../../Api/weeb-e-fied';
import {useInfiniteQuery,} from '@tanstack/react-query'
import Modal from '../../components/CreatePost/Modal';
import { Auth } from '../../Provider/AuthProvider';
import { useNavigate } from "react-router-dom";
const Community = () => {
  const {currentUser}=useContext(Auth)
  const navigate=useNavigate();
  const [open,setOpen]=useState(false)
  let [index,setIndex]=useState(0)
  let curr=0
  useEffect(() => {
    document.title = `Profile | Weeb-e-fied`;
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);
 const {data,isLoading,isPending,isError,status,fetchNextPage,hasNextPage,fetchPreviousPage,hasPreviousPage}=useInfiniteQuery(
    {
      queryKey:["posts"],
      queryFn:({pageParam=0})=>getPosts({pageparam:pageParam}),
      getNextPageParam:(lastPage)=>{       
        if(lastPage?.totalPages===lastPage?.currentPage) return undefined;
        curr=1+lastPage?.currentPage
        console.log(curr)
        return 1+lastPage?.currentPage
      },
      getPreviousPageParam:(firstPage)=>{
        if(firstPage?.currentPage===index) return undefined;
        curr=index-1
        console.log(curr)
        return index-1
    }
    }
 )
 console.log(hasNextPage,hasPreviousPage,index,curr)
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
        <button className={`my-posts  _option ${!hasPreviousPage?"opacity-1-2":""}`} disabled={!hasPreviousPage} onClick={()=>{fetchPreviousPage();setIndex(curr)}}>
        <IoIosArrowBack />
        </button>
        <button className={`my-posts  _option ${!hasNextPage?"opacity-1-2":""}`} onClick={()=>{fetchNextPage();setIndex(curr)}} disabled={!hasNextPage}>
        <IoIosArrowForward />
        </button>
        {
          open && <Modal close={setOpen}/>
        }
    </div>
      {
        data?.pages[index]?.data?.map((post)=><Post post={post} key={post?._id}/>)
      }
        </div>
        <TopCharacters/>
    </div>
    </div>
  )
}

export default Community