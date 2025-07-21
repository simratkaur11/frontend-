import { useEffect, useState } from 'react';

export default function Profilepage() {
  const [userInfo, setUserInfo] = useState(null);
  const baseURL=process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/profile`, {
      credentials: 'include'
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Unauthorized');
      }
    }).then(data => {
      setUserInfo(data);
    }).catch(() => {
      alert("Unauthorized access");
    });
  }, []);

  if (!userInfo) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Welcome, {userInfo.username}</h1>
    </div>
  );
}
