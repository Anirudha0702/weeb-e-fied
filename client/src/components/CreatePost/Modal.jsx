import './Modal.css'
import { RxCross2 } from "react-icons/rx";
import ReactDom from 'react-dom'
import { useContext, useState } from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createPost} from '../../Api/weeb-e-fied';
import { Auth } from '../../Provider/AuthProvider';
const Modal = ({close}) => {
  const {currentUser}=useContext(Auth)
  const queryClient=useQueryClient()
    const [msgLength,setMsgLength]=useState(0);
    const [postBody,setPostBody]=useState("");
    const {mutate}=useMutation({
      mutationFn:async(post)=>{return createPost(post)},
      onSuccess:()=>{
        close(false);
        setPostBody("");
        setMsgLength(0);
        queryClient.invalidateQueries(['posts'])
      }
    })
    console.log(postBody)
    const handleEvent=(e)=>{
        if(postBody.length<=200){  
          setPostBody(e.target.value);
          setMsgLength(e.target.value.length);
        }else{
          window.alert("You can't send more than 200 characters");
        }
      }
  return ReactDom.createPortal(
        <div className="modal" >
           <div className="create-post-modal">
                <RxCross2 className="close-icon" onClick={()=>close(false)}/>
                <h3 className="post-header">Create Post</h3>
                <textarea 
                name="" 
                id="" 
                cols="30" 
                rows="10" 
                className="text-body" 
                placeholder='Post content'
                value={postBody}
                onChange={e=>handleEvent(e)}/>
                <div style={{'color':msgLength>=200?'red':'white'}}>{`${msgLength}/200`}
        </div>
                <button className="create" onClick={()=>mutate({
                  authorId:currentUser.uid,
                  author:currentUser.displayName,
                  authorPhoto:currentUser.photoURL,
                  body:postBody,
                  LikedBy:[],
                  Comments:[]
                })} >Post</button>
           </div>
        </div>,document.getElementById('create-post')
  )
}

export default Modal