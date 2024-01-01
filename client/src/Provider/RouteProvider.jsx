import { RouterProvider,createBrowserRouter,Outlet } from "react-router-dom";
import Home from "../Pages/Home";
import Watch from "../Pages/Watch/Watch";
import Nav from "../components/Nav/Nav";
import Details from "../Pages/Details/Details";
import Search from "../Pages/Search/Search";
import Footer from "../components/Footer/Footer";
import Community from "../Pages/Community/Community";
import Profile from "../Pages/Profile/Profile";
const Layout=()=>{
    return(
        <>
        <Nav/>
        <Outlet/>
        <Footer/>
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
                    path:"/user/:id",
                    element:<Profile/>
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
                    path:'/search/:key',
                    element:<Search/>
                },
                {
                    path:'/community',
                    element:<Community/>
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