import axios from 'axios';
async function getPost(post_id){
    try {
      const res=await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/find/post/${post_id}`);
      return res.data;
    } catch (error) {
      console.log(error)
      return error;
    } 
}
export default getPost;