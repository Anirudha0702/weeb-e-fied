import './Trending.css'
import { GrPrevious ,GrNext} from "react-icons/gr";
import { useQuery } from "@tanstack/react-query"
import { getTrendings } from '../../Api/Kitsu';
import { useRef } from 'react';
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
        return <div>Loading...</div>
    }
  return (
    <div className="trending__wrapper">
        <div className="arraow__wrapper">
            <GrNext className="arrow__icon" onClick={btnpressnext} />
            <GrPrevious className="arrow__icon" onClick={btnpressprev}/>
        </div>
        <div className="cart_wrapper" ref={ref}>
            {
                data?.map((item,idx)=>{
                    return(
                        <div className="cart__img__wrapper" key={idx}>
                            <img src={item.image} alt="img" className="cart__img"/>
                            <div className="rank"># {idx+1}</div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Trending