import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>
        <nav>
          <h1>My App</h1>
          {/* Add navigation links here */}
        </nav>
      </header>
      <main><Outlet /></main>
      <footer>
        <p>© 2023 My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;