import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HeaderFooter from './HeaderFooter';
import axios from 'axios';
import './styles.css';

function SubmitProject() {
  const [username, setUsername] = useState('');
  const [repoName, setRepoName] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        name: username,
        repoLink: repoName,
      });
      setResult('Successfully added project');
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
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            placeholder="Paste the name of your Github project"
          />
        </label>
        <button type="submit">Submit Project</button>
      </form>
      {result !== null && <p>{result}</p>}
    </HeaderFooter>
  );
}

function ConsultProjects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchByName = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${searchTerm}/my-repos`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching projects:', error);
    }
  };

  const handleSearchAll = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/my-repos');
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching all projects:', error);
    }
  };

  const handleDownloadRepo = async (username, repoName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/repos/${username}/${repoName}/download`, {
        responseType: 'blob',  // Indica que la respuesta es un archivo binario
      });

      // Crea un objeto URL para el blob y crea un enlace de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${repoName}.zip`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading repository ${repoName} for user ${username}:`, error);
    }
  };

  return (
    <HeaderFooter>
      <div className="Home">
        <h2>Consult Projects</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Project Name:
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter project name"
            />
          </label>
          <button onClick={handleSearchByName}>Search Projects by Name</button>
        </form>
        <form onSubmit={(e) => e.preventDefault()}>
          <button onClick={handleSearchAll}>Search All Projects</button>
        </form>
        {searchResults.length > 0 && (
          <div>
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map((project, index) => (
                <li key={index}>
                  {project.name} - {project.repoLink}
                  <button onClick={() => handleDownloadRepo(project.name, project.repoLink)}>
                    Download Repo
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
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