import React, { useState } from 'react';

function Home({ registros }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegistros = registros.filter(vehiculo => {
    const term = searchTerm.toLowerCase();
    return vehiculo.marca.toLowerCase().includes(term) || vehiculo.modelo.toLowerCase().includes(term);
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por Marca o Modelo"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {searchTerm && (
        <ul>
          {filteredRegistros.map(vehiculo => (
            <li key={vehiculo.servicioNumber}>
              {`${vehiculo.marca} ${vehiculo.modelo}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
