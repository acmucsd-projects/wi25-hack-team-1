import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      
    </div>
  );
};

export default Layout;
