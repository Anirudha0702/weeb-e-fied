import {updateDoc,doc,setDoc,getDoc,collection,getDocs} from "firebase/firestore"; 
import {db} from './firebase'
const addToList=async (uid,animeInfo)=>{
    const {id, title, poster_image, ageRating, totalEps, showType,provider}=animeInfo;
    try {
        await setDoc(doc(db, "Users",uid,'watchlist',`${id}__${provider}`), {
            id:`${id}__${provider}`,
            title,
            poster_image,
            ageRating,
            totalEps,
            showType,
            status:"Watching"
          });
    } catch (error) {
        window.alert(error.message)
    }
}
const getStatus=async(uid,anime_id)=>{
    try {
        const docRef = doc(db, "Users",uid, "watchlist",anime_id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {status:docSnap.data().status}
        } else {
            return {status:"none"};
          }
    } catch (error) {
        window.alert(error.message)
    }
}
const updateStatus=async(uid,anime_id,status)=>{
    console.log(status)
    try {
        await updateDoc(doc(db,"Users",uid,"watchlist",anime_id),{
            status:status
          })
    } catch (error) {
        window.alert(error.message)
    }
}
const getUserAnimeList=async(uid,status='All')=>{
    let res=[];
    console.log(status,uid)
    try {
        const querySnapshot = await getDocs(collection(db, "Users",uid, "watchlist"));
        querySnapshot.forEach((doc) => {
            if(doc.exists()){
                if(status==='All'){
                    if(doc.data().status!=='none'){
                        res.push(doc.data())
                    }
                }else if(doc.data().status===status){
                    res.push(doc.data())
                }
            }
          }); 
    } catch (error) {
        window.alert(error.message)
    }
    console.log(res)
    return res
}
const removeFromList=async(uid,anime_id)=>{
    
}
export {addToList,getStatus,updateStatus,getUserAnimeList,removeFromList}