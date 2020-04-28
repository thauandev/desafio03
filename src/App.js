import React,{ useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
 const [ repositories, setRepositories ] = useState([]);
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Novo Repositório',
      url: 'nova url',
      techs: ['Novas techs']
    })
    
    const repositorie = response.data;
   
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }
  
 useEffect(()=>{
   api.get('repositories').then(response => {
     setRepositories(response.data)
   })
 }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => <li>
          {repositorie.title}

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
