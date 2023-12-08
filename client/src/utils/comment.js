import axios from "axios";
const comment=async(post_id,comment_info)=>{
    console.log(post_id,comment_info)
    try {
        const res=await axios.put(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/comment/${post_id}`,comment_info);
        return res.data;
      } catch (error) {
        return error; 
      } 
}
export default comment;