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
  const res = await axios.get(
    `${import.meta.env.VITE_WEEB_E_FIED_API}/api/info/${id}`
  );
  return res.data;
}
