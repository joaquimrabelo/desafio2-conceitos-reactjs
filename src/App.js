import React, { useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  async function handleAddRepository() {
    const data = {
      title: `Novo projeto ReactJS ${Date.now()}`
    }
    try {
      const response = await api.post('repositories', data);
      const repository = response.data;
      setRepositories([...repositories, repository]);
    } catch (error) {
      alert('Não foi possível salvar o novo respositório.');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (error) {
      alert('Não foi possível deletar o repositório.');
    }
  }

  async function getRepositories() {
    const response = await api.get('repositories');
    console.log(response.data);
    setRepositories(response.data);
  }

  useEffect(() => {
    getRepositories();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
