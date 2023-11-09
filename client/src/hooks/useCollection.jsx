import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSearch(name) {
    const { data, isLoading, isError }= useQuery(
        {
            queryKey:["search", name], 
            queryFn:async () => {
                const response = await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/search/${name}`);
                console.log(response.data)
                return response.data;
              }
        });
        if (isLoading) {
            return null;
          }
        
          if (isError) {
            return "An error occurred while fetching the data.";
          }
          return data;
}
export function useStream(animeId,episode){
    const res= useQuery(
        {
            queryKey:["watch", `${animeId}/${episode}`], queryFn:async () => {
                const response = await axios.get(`${import.meta.env.VITE_WEEB_E_FIED_API}/api/watch/${animeId}/${episode}`);
                console.log(response.data)
                return response.data;
              }
        }
    );
      return res.data
}