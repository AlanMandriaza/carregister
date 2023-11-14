import React, { useState } from 'react';
import '../styles/RegisterForm.css';  

function RegisterList({ registros }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleVehicleClick = (vehiculo) => {
    setSelectedVehicle(vehiculo);
  };

  return (
    <div>
      <ul>
        {registros.map((vehiculo) => (
          <li
            key={vehiculo.servicioNumber}
            onClick={() => handleVehicleClick(vehiculo)}
            className={selectedVehicle === vehiculo ? 'selected' : ''}
          >
            {`${vehiculo.marca} ${vehiculo.modelo}`}
          </li>
        ))}
      </ul>
      {selectedVehicle && (
        <div>
          <h2>Vehicle Details</h2>
          <p>Marca: {selectedVehicle.marca}</p>
          <p>Modelo: {selectedVehicle.modelo}</p>
          {/* Include other vehicle details here */}
        </div>
      )}
    </div>
  );
}

export default RegisterList;
