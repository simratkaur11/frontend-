import { useContext, useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
  const {userInfo,setUserInfo} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isHovered ,setIsHovered] =useState(false)
  const [hoverLogout ,setHoverLogout] =useState(false)

  const baseURL=process.env.REACT_APP_API_URL;
  //   useEffect(() => {
  //   fetch(`${baseURL}/profile`, {
  //     credentials: "include",
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data?.username) {
  //         setUserInfo(data);
  //       } else {
  //         setUserInfo(null);
  //       }
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error("Profile fetch failed:", err);
  //       setUserInfo(null);
  //       setLoading(false);
  //     });
  // }, []);

//   useEffect(() => {
//   fetch(`${baseURL}/profile`, {
//     credentials: "include",
//   })
//     .then(res => {
//       if (!res.ok) {
//         // If status is 401 or any error, treat as logged out
//         setUserInfo(null);
//         setLoading(false);
//         return;
//       }
//       return res.json();
//     })
//     .then(data => {
//       if (data?.username) {
//         setUserInfo(data);
//       }
//       setLoading(false);
//     })
//     .catch(err => {
//       console.error("Profile fetch failed:", err);
//       setUserInfo(null);
//       setLoading(false);
//     });
// }, []);


  function logout(){
    fetch(`${baseURL}/logout`,{
      credentials:'include',
      method:'POST',
    }).then(()=>{
     setUserInfo(null);
     window.location.href='/';
  });
}
  if (loading) return null;
  const username = userInfo?.username;
    return(
         <header>
          <div className=" header-content ">
                <Link to = "/" className="logo">Myblog</Link>
                <nav>
                  {username ? (
                    <>
                      <Link to="/create"  onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}style={{
                        backgroundColor: isHovered ? '#ff6e9e' : '#ff4d6d',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }} >Create new post🎨</Link>
                      <a onClick={logout} onMouseEnter={() => setHoverLogout(true)}
                        onMouseLeave={() => setHoverLogout(false)}style={{
                        backgroundColor: hoverLogout ? '#ff6e9e' : '#ff4d6d',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}>Logout🚪</a>
                    </>
                  ):(
                    <>
                      <Link to="/login" style={{
                        backgroundColor: '#ff6e9e',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        color: 'white',
                        textDecoration: 'none',
                        marginRight: '8px',
                        fontWeight: '500'
                      }} >Login😺</Link>
                      <Link to="/register" style={{
                        backgroundColor: '#ff6e9e',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: '500'
                      }}>Register🦆</Link>
                    </>
                  )}
                </nav>
                </div>
              </header>
    );
}