import { createContext, useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <Auth.Provider value={{ currentUser }}>
      {children}
    </Auth.Provider>
  );
};
AuthProvider.prototype = {
  children: PropTypes.node
  
};