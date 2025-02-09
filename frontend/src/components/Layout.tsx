import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <h1>My App</h1>
          {/* Add navigation links here */}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2023 My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;