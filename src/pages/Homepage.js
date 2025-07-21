// import Post from "../Post"
import  {useContext, useEffect , useState} from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import Post from "../Post";
import './Homepage.css'; // (optional if you keep CSS separate)

export default function Homepage() {
     const { setUserInfo } = useContext(UserContext);
     const [posts, setPosts] = useState([]);
     const baseURL=process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetch(`${baseURL}/profile`, {
      credentials: 'include',
    }).then(res => {
      if (res.ok) {
        res.json().then(info => setUserInfo(info));
      } else {
        setUserInfo(null);  // Clear on unauthorized
      }
    });
  }, []);
    return(
      <>
    <div className="homepage">
      <div className="hero">
        <div className="hero-content">
          <h1>Start Sharing Your Stories</h1>
          <p>Turn your thoughts into powerful blog posts and reach the world.</p>
          <Link to="/login" className="cta-button">Login</Link>
        </div>
      </div>
       <div className="pamphlets-section">
      <h2 className="pamphlets-heading">What’s Special Here?</h2>
      <div className="pamphlet-cards">
        <div className="pamphlet-card">
        <img className="pamphlet-img"
          src="https://i.pinimg.com/736x/ca/18/0b/ca180b88b17e87881264ba1b6d5d3500.jpg" 
        />
        <h3>Write Freely</h3>
        <p>Express your ideas, thoughts, or diary entries just the way you like.</p>
        </div>
        <div className="pamphlet-card">
        <img className="pamphlet-img"
          src="https://i.pinimg.com/736x/53/34/83/533483126230edc5a6ff82bcb2629d34.jpg" 
        />
        <h3>Connect With Others</h3>
        <p>Read blogs from others and get inspired by shared experiences.</p>
        </div>
        <div className="pamphlet-card">
        <img className="pamphlet-img"
          src="https://i.pinimg.com/736x/2f/02/c1/2f02c111346f6cad8b652ef396e7e420.jpg" 
        />
        <h3>Preserve Your Journey</h3>
        <p>Track your personal growth by saving your stories forever.</p>
        </div>
      </div>
      </div>
     <section className="blog-category-section cooking">
        <div className="overlay-content">
          <h2>🍳 Cooking Blogs</h2>
          <p>Explore delicious recipes, kitchen tips & culinary stories.</p>
        </div>
      </section>

      <section className="blog-category-section travel">
        <div className="overlay-content">
          <h2>✈️ Travel Blogs</h2>
          <p>Wander through stories from across the globe.</p>
        </div>
     </section>

      <section className="blog-category-section selfcare">
        <div className="overlay-content">
          <h2>🧖‍♀️ Self-Care Blogs</h2>
          <p>Nurture your mind and soul through wellness journeys.</p>
        </div>
      </section>
      <div className="footer">
  <h2>Enjoying the blogs💕</h2>
  <p> Don't forget to share with your cutesy friends!</p>
  <div className="footer-icons">
    <a href="https://instagram.com" target="_blank" rel="noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="https://facebook.com" target="_blank" rel="noreferrer">
      <i className="fab fa-facebook"></i>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noreferrer">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://t.me" target="_blank" rel="noreferrer">
      <i className="fab fa-telegram"></i>
    </a>
    <a href="https://reddit.com" target="_blank" rel="noreferrer">
      <i className="fab fa-reddit"></i>
    </a>
  </div>
</div>
<Link to="/blogs" className="floating-blogs-btn"> See Blogs👀</Link>

    </div>
    </>
  );
}
