
import './App.css';
import Post from "./Post";
import Header from "./Header"
import {Route,Routes} from "react-router-dom"
import Layout from './Layout';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Profilepage from './pages/Profilepage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import AllPosts from './pages/Allposts';
import SinglePost from './pages/SinglePost';
import EditPost from './pages/EditPost';
function App() {
  return (
    <>
    <UserContextProvider>
     <Routes>
      <Route path ="/" element={<Layout/>}>
      <Route path="/blogs" element={<AllPosts />} />
      <Route index element ={<Homepage />} />
      <Route path='/login' element={<Loginpage/> } />
      <Route path='/register' element={<Registerpage/>} />
      <Route path='/profile' element={<Profilepage />} />
      <Route path="/create" element={<CreatePost/>}/>
      <Route path="/post/:id" element={<SinglePost />} /> 
      <Route path="/edit/:id" element={<EditPost />} />
 
      </Route>
      </Routes>
    </UserContextProvider>
    
    </>
   
  );
}

export default App;
