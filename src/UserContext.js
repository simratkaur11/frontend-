import React, { createContext, useState , useEffect } from "react";
export const UserContext = createContext({});

export function UserContextProvider  ({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true); 
    const baseURL=process.env.REACT_APP_API_URL;
  //   useEffect(() => {
  //   fetch(`${baseURL}/profile`, {
  //     credentials: 'include', // important to include cookies
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setUserInfo({
  //         username: data.username,
  //         id: data.userId,  // ✅ this is what SinglePost.js uses
  //       });
  //     })
  //     .catch(err => {
  //       console.error("Error fetching user profile:", err);
  //     });
  // }, []);


//   useEffect(() => {
//   fetch(`${baseURL}/profile`, {
//     credentials: 'include',
//   })
//     .then(async res => {
//       if (!res.ok) {
//         // Unauthorized or error — clear userInfo
//         setUserInfo(null);
//         return;
//       }

//       const data = await res.json();
//       if (data?.username && data?.userId) {
//         setUserInfo({
//           username: data.username,
//           id: data.userId,
//         });
//       } else {
//         setUserInfo(null);
//       }
//     })
//     .catch(err => {
//       console.error("Error fetching user profile:", err);
//       setUserInfo(null);
//     });
// }, []);
      useEffect(() => {
    fetch(`${baseURL}/profile`, {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        if (data?.username && data?.userId) {
          setUserInfo({
            username: data.username,
            id: data.userId,
          });
        }
      })
      .catch(err => {
        console.error("Profile fetch error:", err);
        setUserInfo(null);
      })
      .finally(() => {
        setLoading(false); // Ensure loading stops in all cases
      });
  }, [baseURL]);

    return(
        <UserContext.Provider value={{userInfo, setUserInfo}}>
        {children}
        </UserContext.Provider>
    );
}  