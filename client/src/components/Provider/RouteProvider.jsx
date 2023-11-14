import { RouterProvider,createBrowserRouter,Outlet } from "react-router-dom";
import Home from "../../Pages/Home";
import Watch from "../../Pages/Watch/Watch";
import Nav from "../Nav/Nav";
import Details from "../../Pages/Details/Details";
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