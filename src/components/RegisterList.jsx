import React, { useState, useEffect } from 'react';
import '../styles/RegisterForm.css';

function RegisterList({ registros, selectedVehicle }) {
  const [currentSelectedVehicle, setCurrentSelectedVehicle] = useState(selectedVehicle);

  // Cargar el vehículo seleccionado del almacenamiento local cuando el componente se monta
  useEffect(() => {
    const storedVehicle = localStorage.getItem('selectedVehicle');
    if (storedVehicle) {
      setCurrentSelectedVehicle(JSON.parse(storedVehicle));
      // Opcional: limpiar el almacenamiento local
      localStorage.removeItem('selectedVehicle');
    }
  }, []);

  useEffect(() => {
    // Actualiza el vehículo seleccionado cuando cambia desde el Navbar
    setCurrentSelectedVehicle(selectedVehicle);
  }, [selectedVehicle]);

  const handleVehicleClick = (vehiculo) => {
    setCurrentSelectedVehicle(vehiculo);
    localStorage.setItem('selectedVehicle', JSON.stringify(vehiculo));
  };

  return (
    <div className="register-container">
      <ul className="vehicle-list">
        {registros.map((vehiculo) => (
          <li
            key={vehiculo.servicioNumber}
            onClick={() => handleVehicleClick(vehiculo)}
            className={currentSelectedVehicle && vehiculo.servicioNumber === currentSelectedVehicle.servicioNumber ? 'selected' : ''}
          >
            {`${vehiculo.marca} ${vehiculo.modelo}`}
          </li>
        ))}
      </ul>
      {currentSelectedVehicle && (
        <div className="vehicle-details">
          <h2>Detalles de Vehiculo</h2>
          <div className="detail-row">
            <span>Numero de servicio:</span>
            <span>{currentSelectedVehicle.servicioNumber}</span>
          </div>
          <div className="detail-row">
            <span>Marca:</span>
            <span>{currentSelectedVehicle.marca}</span>
          </div>
          <div className="detail-row">
            <span>Modelo:</span>
            <span>{currentSelectedVehicle.modelo}</span>
          </div>
          <div className="detail-row">
            <span>Cliente:</span>
            <span>{currentSelectedVehicle.cliente}</span>
          </div>
          <div className="detail-row">
            <span>Patente:</span>
            <span>{currentSelectedVehicle.patente}</span>
          </div>
          <div className="detail-row">
            <span>Cilindrada:</span>
            <span>{currentSelectedVehicle.cilindrada}</span>
          </div>
          <div className="detail-row">
            <span>Ultimo Cambio de Aceite:</span>
            <span>{currentSelectedVehicle.ultimoCambioAceite}</span>
          </div>
          <div className="detail-row">
            <span>Kilometraje:</span>
            <span>{currentSelectedVehicle.kilometraje}</span>
          </div>
          <div className="detail-row">
            <span>Color:</span>
            <span>{currentSelectedVehicle.color}</span>
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
