import React, { useState } from 'react';
import axios from 'axios';

function App() {
 const [repoLink, setRepoLink] = useState('');
 const [result, setResult] = useState<boolean | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/check-repo', { repoLink });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
 };

 return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Repo Link:
          <input type="text" value={repoLink} onChange={e => setRepoLink(e.target.value)} />
        </label>
        <button type="submit">Check Repo</button>
      </form>
      {result !== null && <p>Dockerfile and docker-compose.yml exist: {result.toString()}</p>}
    </div>
 );
}

export default App;