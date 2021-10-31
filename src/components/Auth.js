import React, { useEffect, useState } from "react";
import firebase from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [blogId, setBlogId] = useState("");
  const [blogContentFetch, setBlogContentFetch] = useState("");
  const [navShow, setNavShow] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
      setNavShow(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,blogId,setBlogId, blogContentFetch, setBlogContentFetch, navShow, setNavShow
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
