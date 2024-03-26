import { signOut } from "firebase/auth";
import { auth } from "./firebase";
const signout = async() => {
    try {
      await signOut(auth);
      location.reload()
    } catch (error) {
      window.alert(error.message);
    }
  }
  export default signout;