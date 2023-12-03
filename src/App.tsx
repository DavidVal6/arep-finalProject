import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [gameLink, setGameLink] = useState('');
  const [result, setResult] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/check-game', { username, gameLink });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <div className="logo-container">
            <img
              src="/JDSGameHubLogo.png"
              alt="JDS GameHub Logo"
              className="logo"
              style={{ width: '150px', height: 'auto' }}
            />
          </div>
          <div className="project-name">
            <h1 style={{ fontFamily: 'Orbitron, sans-serif' }}>JDS GameHub</h1>
          </div>
        </div>
      </header>
      <form onSubmit={handleSubmit}>
      <h2>Add Github Project</h2>
      <label >
        Your Name:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Github username"
        />
      </label>
      <label>
        Project Name:
        <input
          type="text"
          value={gameLink}
          onChange={(e) => setGameLink(e.target.value)}
          placeholder="Paste the name of your Github project"
        />
      </label>
      <button type="submit" style={{ fontFamily: 'Orbitron, sans-serif' }}>Submit Project</button>
      </form>
      {result !== null && (
        <p>Your project has been submitted successfully: {result.toString()}</p>
      )}
      <footer>
        <p>&copy; 2023 JDS GameHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;


