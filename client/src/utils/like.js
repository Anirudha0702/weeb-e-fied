import axios from 'axios';
async function like(post_id,like_info){ 
    try {
      const res=await axios.put(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/like/${post_id}`,like_info);
      return res.data;
    } catch (error) {
      return error; 
    } 
}
export default like;