import { getTopCharacters } from "../../Api/Jikan";
import { useQuery } from "@tanstack/react-query";
import { FaThumbsUp } from "react-icons/fa";
export default function TopCharacters() {
    const {data,isLoading,isPending}=useQuery(
        {
            queryKey:['top-characters'],
            queryFn:getTopCharacters
        }
    )
    if(isLoading || isPending){
        return <div>Loading...</div>
    }
 

  const list = data?.map((el, idx) => {
    return (
      <li key={idx} className='flex gap-2'>
        <div className='character-dp'>
          <img
            src={el.images.webp.image_url}
            alt={el.name}
            className='h-20 w-20 min-w-20 rounded-full object-cover'
          />
        </div>
        <div className=' '>
          <h3 className='font-bold'>{el.name}</h3>
          <div className=''>
            <p className="line-clamp-1 w-fit">{el.about}</p>
          </div>
          <div className=''>
            <div className='flex gap-2 items-center'>
              <FaThumbsUp />
              <span>{el.favorites}</span>
            </div>
          </div>
        </div>
      </li>
    );
  });
  return (

    //   {isLoading ? <LoadingSpinner /> : <ul>{list}</ul>}
    <ul className='mt-16 w-40 relative px-1 grow flex h-fit gap-1 justify-start flex-wrap'>
      <h1 className='absolute -top-12 block text-white font-medium text-2xl md:text-3xl e'>Top Characters</h1>
      {list}</ul>
  
  );
}