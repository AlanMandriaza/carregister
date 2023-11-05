import React from 'react';
import { Link } from 'react-router-dom';

function RegisterList({ registros }) {
  return (
    <div>
      <h2>Lista de Vehículos</h2>
      <ul>
        {registros.map((registro) => (
          <li key={registro.servicioNumber}>
            <Link to={`/vehicle/${registro.servicioNumber}`}>
              {`${registro.marca} ${registro.modelo} - ${registro.patente}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegisterList;
