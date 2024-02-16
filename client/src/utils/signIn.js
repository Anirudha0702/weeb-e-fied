import {signInWithPopup} from 'firebase/auth';
import{auth,provider} from './firebase';
import {db} from './firebase'
import { Timestamp, collection ,doc, getDoc,setDoc} from 'firebase/firestore';
const signIn = async () => {
    
    try {
       const res= await signInWithPopup(auth, provider);

       const {email,photoURL,displayName,uid}=res.user;
       const docref=doc(collection(db,'Users'),uid);
       const response=await getDoc(docref);
       if(response._document===null ){
        await setDoc(doc(db, "Users",uid), {
            uid,
            displayName,
            email,
            photoURL,
            coverURL:"https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWxvbmV8ZW58MHx8MHx8fDA%3D",
            notificationSubscription:false,
            createdAt:Timestamp.now()
          });
        await setDoc(doc(db, "Users",uid,'watchlist',"dummy"), {
            title:"dummy",
            status:"none"
          });
       }
       return {email,photoURL,displayName,uid}

    } catch (error) {
        console.log("error",error)
        return{error:true}
    }
}
export default signIn;
// WeQezayQZHRxNKGhPozWEO0TorM2