import { db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
const getUser=async(id)=>{
    if(id){
        try {
            const data=await getDoc(doc(db,"Users",id))
            if(data.exists()){
                console.log(data.data())
                return data.data()
            }
            else{
                throw new Error("User does not exist")
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export default getUser;