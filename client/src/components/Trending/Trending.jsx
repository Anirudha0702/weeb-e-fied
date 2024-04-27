import './Trending.css'
import { GrPrevious ,GrNext} from "react-icons/gr";
import { useQuery } from "@tanstack/react-query"
import { getTrendings } from '../../Api/Kitsu';
import { useRef } from 'react';
import { Link } from 'react-router-dom'
import CartLoader from '../Loaders/CartLoader/CartLoader';
const Trending = () => {
    const ref=useRef(null);
    const {isLoading,isPending,data}=useQuery({
        queryKey:['trending'],
        queryFn:getTrendings
    })
    const btnpressprev = () => {
        let width = ref.current.clientWidth;
        ref.current.scrollLeft = ref.current.scrollLeft - width;
    }

    const btnpressnext = () => {
        let width = ref.current.clientWidth;
        ref.current.scrollLeft = ref.current.scrollLeft + width;
    }
    if(isLoading || isPending){
        <div className="cart_wrapper flex gap-2 bg-red-600" ref={ref}>
            <CartLoader/>
        </div>
    }
  return (
    <div className="mt-20 flex relative h-[15rem] md:h-[20rem] xl:h-[30vw] max-h-[20rem]">
        <h3 className="absolute -top-12 block text-white font-medium text-2xl md:text-3xl  left-2">Trendings</h3>
        <div className="arraow__wrapper">
            <GrNext className="arrow__icon" onClick={btnpressnext} />
            <GrPrevious className="arrow__icon" onClick={btnpressprev}/>
        </div>
        <div className="cart_wrapper " ref={ref}>
            {
                data?.map((item,idx)=>{
                    return(
                        <Link to={`/details/${item.id}?provider=kitsu`}key={idx}>
                        <div className="cart__img__wrapper" key={idx}>
                            <img src={
                                item.attributes.posterImage.original ||
                                item.attributes.posterImage.large || 
                                item.attributes.posterImage.medium } alt="img" className="cart__img"/>
                            <div className="rank"># {idx+1}</div>
                        </div>
                        </Link>
                    )
                })
            }

            
        </div>
    </div>
  )
}

export default Trending