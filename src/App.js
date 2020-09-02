import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [projetcs, setProjects] = useState([]);
  useEffect(() => {
    api.get('/repositories').then((resp) => {
      console.log("...",resp.data);
      setProjects(resp.data);
    })
  }, []);
  async function handleAddRepository() {
    const resp = await api.post('repositories',
      { title: `Novo projecto ${Date.now()}`, owner: 'jose Levi' });

    setProjects([...projetcs, resp.data]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`/repositories/${id}`)
    const projectIndex = projetcs.findIndex((p) => p.id === id);
    projetcs.splice(projectIndex, 1);
    setProjects([...projetcs]);
  }
  
  const listItems = projetcs.map(p=><li key={p.id}>{p.title}
      <button onClick={() => handleRemoveRepository(p.id)}>
        Remover
      </button>
    </li>);

  return (
    <div>
      
      <ul data-testid="repository-list">
        {listItems}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
