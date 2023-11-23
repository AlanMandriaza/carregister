import React, { useState } from 'react';
import '../styles/RegisterForm.css';

function RegisterList({ registros }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleVehicleClick = (vehiculo) => {
    setSelectedVehicle(vehiculo);
  };

  return (
    <div className="register-container">
      <ul className="vehicle-list">
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
        <div className="vehicle-details">
          <h2>Detalles de Vehiculo</h2>
          <div className="detail-row">
            <span>Numero de servicio:</span>
            <span>{selectedVehicle.servicioNumber}</span>
          </div>
          <div className="detail-row">
            <span>Marca:</span>
            <span>{selectedVehicle.marca}</span>
          </div>
          <div className="detail-row">
            <span>Modelo:</span>
            <span>{selectedVehicle.modelo}</span>
          </div>
          <div className="detail-row">
            <span>Cliente:</span>
            <span>{selectedVehicle.cliente}</span>
          </div>
          <div className="detail-row">
            <span>Patente:</span>
            <span>{selectedVehicle.patente}</span>
          </div>
          <div className="detail-row">
            <span>Cilindrada:</span>
            <span>{selectedVehicle.cilindrada}</span>
          </div>
          <div className="detail-row">
            <span>Ultimo Cambio de Aceite:</span>
            <span>{selectedVehicle.ultimoCambioAceite}</span>
          </div>
          <div className="detail-row">
            <span>Kilometraje:</span>
            <span>{selectedVehicle.kilometraje}</span>
          </div>
          <div className="detail-row">
            <span>Color:</span>
            <span>{selectedVehicle.color}</span>
          </div>
        </div>
      )}
      {registros.length === 0 && (
        <div>
          <h3>Sin registros</h3>
        </div>
      )}
    </div>
  );
}

export default RegisterList;
