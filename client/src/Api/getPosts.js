import axios from 'axios';
async function getPosts({pageparam=0}){
    console.log(pageparam)
    try {
      const res=await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/find/all?page=${pageparam}`);
      return res.data;
    } catch (error) {
      console.log(error)
      return error;
    } 
}
export default getPosts;