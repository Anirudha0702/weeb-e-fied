import {AiOutlineGithub,AiFillTwitterSquare,AiFillFacebook,AiOutlineInstagram} from "react-icons/ai"
import { Link } from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  return (
    <>
    <footer className='footer'>
       <div className="links ">
           <span className=''>Follow me</span>
           <Link to={import.meta.env.VITE_GITHUB}><AiOutlineGithub className='link'/></Link>
           <Link to={import.meta.env.VITE_INSTAGRAM}><AiOutlineInstagram className='link'/></Link>
           <Link to={import.meta.env.VITE_FACEBOOK}><AiFillFacebook className='link'/></Link>
           <Link to={import.meta.env.VITE_TWITTER}><AiFillTwitterSquare className='link'/></Link>
       </div>
       <span>
       Copyright ©<b><i>Weeb E Fied</i></b> All Rights Reserved
This site does not store any files on its server.
       </span>
    </footer>
    
    </>
  )
}

export default Footer