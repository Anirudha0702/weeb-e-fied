import axios from 'axios';
async function disLike(post_id,like_info){ 
    console.log(post_id,like_info)
    try {
      const res=await axios.put(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/dislike/${post_id}`,like_info);
      return res.data;
    } catch (error) {
      return error; 
    } 
}
export default disLike;