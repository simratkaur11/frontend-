import Header from "./Header";
import { Outlet } from "react-router-dom";
export default function Layout(){
    return (
    <>
      <Header />
      <main>
        <div className="main-container">
          <Outlet />
        </div>
      </main>
    </>
  );
}