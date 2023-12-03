import React from 'react';

function HeaderFooter({ children }) {
  return (
    <div className="App">
      <header>
        <div className="header-content">
          <div className="logo-container">
            <img
              src="/JDSGameHubLogo.png"
              alt="JDS GameHub Logo"
              className="logo"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <div className="project-name">
            <h1 style={{ fontFamily: 'Orbitron, sans-serif' }}>JDS GameHub</h1>
          </div>
        </div>
      </header>
      <div className="content">{children}</div>
      <footer>
        <p>&copy; 2023 JDS GameHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HeaderFooter;
