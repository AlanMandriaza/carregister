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
          <h2>Detalles de vehiculo</h2>
          <p>Marca: {selectedVehicle.marca}</p>
          <p>Modelo: {selectedVehicle.modelo}</p>
          <p>Cliente: {selectedVehicle.nombreRegistro}</p>
          <p>Patente: {selectedVehicle.patente}</p>
          <p>Cilindrada: {selectedVehicle.cilindrada}</p>
          <p>Anio: {selectedVehicle.anioFabricacion}</p>
          
          <p>Aceite: {selectedVehicle.ultimoCambioAceite}</p>
          <p>Kilometraje: {selectedVehicle.kilometraje}</p>
          <p>Color: {selectedVehicle.color}</p>
          <p>Numero de registro: {selectedVehicle.servicioNumber}</p>

          {/* Include other vehicle details here */}

        </div>
      )}
    </div>
  );
}

export default RegisterList;
