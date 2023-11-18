import { RouterProvider,createBrowserRouter,Outlet } from "react-router-dom";
import Home from "../../Pages/Home";
import Watch from "../../Pages/Watch/Watch";
import Nav from "../Nav/Nav";
import Details from "../../Pages/Details/Details";
import Search from "../../Pages/Search/Search";
const Layout=()=>{
    return(
        <>
        <Nav/>
        <Outlet/>
        </>
    )

}
const router=createBrowserRouter(
    [
        {
            path:"/",
            element:<Layout/>,
            children:[
                {
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/watch/:name",
                    element:<Watch/>
                
                },
                {
                    path:'/details/:name',
                    element:<Details/>
                },
                {
                    path:'/search',
                    element:<Search/>
                }
            ]
        },
        
    ]
);
const RouteProvider = ({children}) => {
    return (
        <RouterProvider router={router}>
            {children}
        </RouterProvider>
    )
}
export default RouteProvider