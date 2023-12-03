import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HeaderFooter from './HeaderFooter';
import axios from 'axios';
import './styles.css';

function SubmitProject() {
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
    <HeaderFooter>
      <form onSubmit={handleSubmit}>
        <h2>Add Github Project</h2>
        <label>
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
        <button type="submit" >
          Submit Project
        </button>
      </form>
      {result !== null && (
        <p>Your project has been submitted successfully: {result.toString()}</p>
      )}
    </HeaderFooter>
  );
}

function ConsultProjects() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchByName = async () => {
    // Realiza la búsqueda por nombre utilizando el valor de searchTerm
    try {
      const response = await axios.get(`/search-by-name?term=${searchTerm}`);
      console.log('Projects found:', response.data);
    } catch (error) {
      console.error('Error searching projects:', error);
    }
  };

  const handleSearchAll = async () => {
    // Realiza la búsqueda de todos los proyectos
    try {
      const response = await axios.get('/search-all-projects');
      console.log('All projects:', response.data);
    } catch (error) {
      console.error('Error searching all projects:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Puedes realizar acciones adicionales aquí si es necesario
    // Llamamos a la función de búsqueda por nombre al enviar el formulario
    handleSearchByName();
  };

  return (
    <HeaderFooter>
      <div className="Home">
        <h2>Consult Projects</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Project Name:
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter project name"
            />
          </label>
          <button type="submit" >
            Search Projects by Name
          </button>
        </form>
        <form onSubmit={handleSearchAll}>
          <button onClick={handleSearchAll}>
            Search All Projects
          </button>
        </form>
      </div>
    </HeaderFooter>
  );
}

function Home() {
  return (
    <HeaderFooter>
      <div className="Home">
        <h2>Welcome to JDS GameHub!</h2>
        <Link to="/submit">
          <button >Submit Project</button>
        </Link>
        <Link to="/consult">
          <button >Consult Projects</button>
        </Link>
      </div>
    </HeaderFooter>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<SubmitProject />} />
        <Route path="/consult" element={<ConsultProjects />} />
      </Routes>
    </Router>
  );
}

export default App;