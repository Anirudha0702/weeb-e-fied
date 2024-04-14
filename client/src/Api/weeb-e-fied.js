import axios from "axios";

export async function getStreamingLinks(endpoint) {
  const res = await axios.get(
    `${import.meta.env.VITE_WEEB_E_FIED_API}/api/${endpoint}`
  );
  return res.data;
}
export async function searchByName(name) {
  const res = await axios.get(
    `${import.meta.env.VITE_WEEB_E_FIED_API}/api/search/${name}`
  );
  return res.data;
}
export async function getAnimeInfo(id) {
  if(id==='error') throw new Error('Invalid ID');
  const res = await axios.get(
    `${import.meta.env.VITE_WEEB_E_FIED_API}/api/info/${id}`
  );
  return res.data;
}
export async function createPost(post){ 
  try {
    const res=await axios.post(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/create`,post);
    return res.data;
  } catch (error) {
    console.log(error)
    return error; 
  } 
}
export async function getPost(post_id){
  try {
    const res=await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/find/post/${post_id}`);
    return res.data;
  } catch (error) {
    console.log(error)
    return error;
  } 
}
export async function getPosts({pageparam=0}){
  console.log(pageparam)
  try {
    const res=await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/find/all?page=${pageparam}`);
    return res.data;
  } catch (error) {
    console.log(error)
    return error;
  } 
}

export const comment=async(post_id,comment_info)=>{
  console.log(post_id,comment_info)
  try {
      const res=await axios.put(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/comment/${post_id}`,comment_info);
      return res.data;
    } catch (error) {
      return error; 
    } 
}
export async function like(post_id,like_info){ 
  try {
    const res=await axios.put(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/like/${post_id}`,like_info);
    return res.data;
  } catch (error) {
    return error; 
  } 
}
export async function disLike(post_id,like_info){ 
  console.log(post_id,like_info)
  try {
    const res=await axios.put(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/post/dislike/${post_id}`,like_info);
    return res.data;
  } catch (error) {
    return error; 
  } 
}
