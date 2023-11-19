import './Trending.css'
import { GrPrevious ,GrNext} from "react-icons/gr";
import { useQuery } from "@tanstack/react-query"
import { getTrendings } from '../../Api/Kitsu';
import { useRef } from 'react';
import { Link } from 'react-router-dom'
const Trending = () => {
    const ref=useRef(null);
    const btnpressprev = () => {
        let width = ref.current.clientWidth;
        ref.current.scrollLeft = ref.current.scrollLeft - width;
    }

    const btnpressnext = () => {
        let width = ref.current.clientWidth;
        ref.current.scrollLeft = ref.current.scrollLeft + width;
    }
    const {isLoading,isPending,data}=useQuery({
        queryKey:['trending'],
        queryFn:getTrendings
    })
    if(isLoading || isPending){
        <div className="trending__wrapper">
        <div className="arraow__wrapper">
            <GrNext className="arrow__icon" onClick={btnpressnext} />
            <GrPrevious className="arrow__icon" onClick={btnpressprev}/>
        </div>
        <div className='cart_wrapper' ref={ref}>
        <div className="cart__img__wrapper loading" ></div>
            <div className="cart__img__wrapper loading" ></div>
            <div className="cart__img__wrapper loading" ></div>
            <div className="cart__img__wrapper loading" ></div>
            <div className="cart__img__wrapper loading" ></div>
            <div className="cart__img__wrapper loading" ></div>
            <div className="cart__img__wrapper loading" ></div>
            <div className="cart__img__wrapper loading" ></div>
        </div>
    </div>
    }
  return (
    <div className="trending__wrapper">
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