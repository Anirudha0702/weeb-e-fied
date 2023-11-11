import {BsSearch,BsWechat} from "react-icons/bs"
import {Link} from 'react-router-dom'
import { useContext, useState } from 'react';
import Logo from "./../../Assets/de.png"
import {FaUserAlt} from 'react-icons/fa'
import {AiFillSetting,AiFillHeart} from 'react-icons/ai'
import {LuLogOut} from 'react-icons/lu'
import {signInWithPopup} from 'firebase/auth';
import {auth,provider} from './../../utils/firebase'
import "./Nav.css"
import { Auth } from "../Provider/AuthProvider";
const Nav = () => {
    const {currentUser}=useContext(Auth)
    const session={
        status:'authenticated',
        data:{
            user:
            {name:'Anirudha Pradhan',email:''}}};
    const user=session?.data?.user;
    const [search,setSearch]=useState("")
    const[showSearchbar,setShowSearchbar]=useState(false)
    const [navOpen,setNavOpen]=useState(false)
    const imgStyle={
        position:"absolute",
        width:"100%",
        height:"100%",
        objectFit:"cover"
    }
    const handleSignIn=async()=>{
        const res= await signInWithPopup(auth, provider);
    }
    const handleSearch=(e)=>{}
  return (
    <div>
    <header className="navbar">
            <Link to={"/"}>
            <div className="logo-wrapper">
                <img
                    src={Logo}
                    style={imgStyle}
                    alt='user Image'
                />
            </div></Link>
            <div className="search-box">
                <input type="text" name="" value={search} onKeyDown={e=>{
                    if(e.key=="Enter"){
                        handleSearch(e);
                    }
                }}id="" className='' placeholder='Search Anime' onChange={e=>setSearch(e.target.value)}/>
                <BsSearch className='search-btn' onClick={(e)=>handleSearch(e)}/>
            </div>
            <div className='wrapper'>
            <BsSearch className='search-icon__low-resolution' onClick={()=>{setShowSearchbar(!showSearchbar)}}/>
            {
                currentUser!==null?(
                    <>
                    <div className='profile-photo-wrapper'onClick={()=>{setNavOpen(!navOpen)}}>
                        <img
                            src={currentUser?.photoURL}
                            alt='user Image'
                            style={imgStyle}
                            className='profile-photo'
                            referrerPolicy="no-referrer"
                            />
                    </div>
                    {
                        navOpen &&
                        <div className='profile-options'>
                            <span>
                                {currentUser?.displayName}
                            </span>
                            <span>{currentUser.email}</span>
                            <ol>
                                <li className="option"><FaUserAlt/>Profile</li>
                                <li className="option"><AiFillHeart/>WatchList</li>
                                <li className="option"><AiFillSetting/>Settings</li>
                                <li className="option"><LuLogOut/>Logout</li>
                            </ol>
                        </div>
                    }
                    </>
                ):(
                    <div className='community__signin__wrapper'>
                        
                        <Link to={'https://chat.whatsapp.com/G7TLEnqFpMlJcG7cMl828j'}>
                        <BsWechat className='community'/>
                        </Link>
                <button type="" className='signin-btn' onClick={handleSignIn}>Sign In</button>
                    </div>
                    ) 
            }
            </div>
    </header>
    <div className={`${showSearchbar?'':'remove__from__dom'} search-box__low-resolution`}>
                <input type="text" name="" value={search} onKeyDown={e=>{
                    if(e.key=="Enter"){
                        handleSearch(e);
                    }
                }}id="" className='' placeholder='Search Anime' onChange={e=>setSearch(e.target.value)}/>
                <BsSearch className='search-btn' onClick={(e)=>handleSearch(e)}/>
            </div>
    </div>
  )
}

export default Nav