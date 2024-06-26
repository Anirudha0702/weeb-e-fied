import "./Community.css";
import {  useEffect, useContext } from "react";
import Cover from "../../assets/community-header.jpg";
import { GoPlus } from "react-icons/go";
import TopCharacters from "../../components/TopCharacters/TopCharacters";
import { getPosts } from "../../Api/weeb-e-fied";
import { useInfiniteQuery } from "@tanstack/react-query";
import Modal from "../../components/CreatePost/Modal";
import { Auth } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import AllPosts from "../../components/AllPosts/AllPosts";
import PostLoader from "../../components/Loaders/PostLoader/PostLoader";
const Community = () => {
  const { currentUser } = useContext(Auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    document.title = `community | Weeb-e-fied`;
  }, [currentUser, navigate]);
  const posts = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => getPosts({ pageparam: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNext ? lastPage?.CurrentPage + 1 : undefined;
    },
  });


  return (
    <div className="community-page">
      <header className="community-header">
        <img src={Cover} alt="" className="cover-image" />
        <span className="text">Weeb-e-fied Connect</span>
      </header>

      <div className="section-wrapper">
        <div className="posts-wrapper">
          <div className="post-options">
            <button
              className="create-post _option"
              onClick={() => document.getElementById("create-post").showModal()}
            >
              Create Post
              <GoPlus className="plus-icon" />
            </button>
            <Modal/>
          </div>
          {
            posts?.isLoading?(
              <PostLoader/>
            ):posts.isError?(
              <div className="flex mx-auto w-fit p-4">Unable to fetch posts Try again!!!</div>
            
            ):(<AllPosts
              posts={posts.data.pages.flatMap((page) => page.data)}
              isError={posts.isError}
              hasMore={posts.hasNextPage}
              isLoading={posts.isLoading}
              newPosts={posts.fetchNextPage}
            />)
          }
        </div>
        <TopCharacters />
      </div>
    </div>
  );
};

export default Community;
