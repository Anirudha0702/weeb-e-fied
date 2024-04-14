import InfiniteScroll from "react-infinite-scroll-component"
import Post from "../Post/Post"
const AllPosts = ({posts,hasMore,isError,isLoading,newPosts}) => {
  return <>
  <ul>
      <InfiniteScroll next={newPosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
              <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
              </p>
          }
          dataLength={posts.length}>
              {
                  posts.map(post =>{
                      return <Post key={post?._id} post={post} />
                  })
              }
      </InfiniteScroll>
  </ul>
</>
}


export default AllPosts