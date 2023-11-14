import React from 'react';

function Home({ registros }) {
  return (
    <div>
      <h2>Inicio</h2>
      <p>Número de Vehículos Registrados: {registros.length}</p>
      {registros.length > 0 && (
        <div>
          <h3>Vehículos Registrados</h3>
          
        </div>
      )}
    </div>
  );
}

export default Home;
