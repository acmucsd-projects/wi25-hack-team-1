import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
        <AuthModal />
      </main>
    </div>
  );
};

export default Layout;
