import React from 'react';

function RegisterList({ registros }) {
  return (
    <div>
      <h2>Autos Registrados</h2>
      <ul>
        {registros.map((registro, index) => (
          <li key={index}>
           
            {`${registro.marca} ${registro.modelo} - ${registro.patente}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegisterList;
