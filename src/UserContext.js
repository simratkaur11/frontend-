import React, { createContext, useState , useEffect } from "react";
export const UserContext = createContext({});

export function UserContextProvider  ({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const baseURL=process.env.REACT_APP_API_URL;
    useEffect(() => {
    fetch(`${baseURL}/profile`, {
      credentials: 'include', // important to include cookies
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo({
          username: data.username,
          id: data.userId,  // ✅ this is what SinglePost.js uses
        });
      })
      .catch(err => {
        console.error("Error fetching user profile:", err);
      });
  }, []);
    return(
        <UserContext.Provider value={{userInfo, setUserInfo}}>
        {children}
        </UserContext.Provider>
    );
}  