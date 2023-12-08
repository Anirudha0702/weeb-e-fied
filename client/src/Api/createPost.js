import axios from 'axios';
async function createPost(post){ 
    try {
      const res=await axios.post(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/create`,post);
      return res.data;
    } catch (error) {
      console.log(error)
      return error; 
    } 
}
export default createPost;