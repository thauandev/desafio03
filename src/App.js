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
    await api.delete(`repositories/${id}`)
     /** Adiciona na variavel a busca referente ao state de repositories
      * A busca filtra os repositórios que não tem id igual ao id do repositório removido
     */
    const newRepositories = repositories.filter(repositorie => repositorie.id !== id);
     /** Atualiza a lista de reposítorios com os que não foram removidos */
    setRepositories(newRepositories);
    
  }
  
 useEffect(()=>{
   api.get('repositories').then(response => {
     setRepositories(response.data)
   })
 }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => <li key={repositorie.id}>
          {repositorie.title}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
