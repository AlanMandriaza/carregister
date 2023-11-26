import React, { useState, useEffect } from 'react';
import '../styles/RegisterForm.css';
import '../styles/RegisterList.css';

function RegisterList({ registros, selectedVehicle }) {
  const [currentSelectedVehicle, setCurrentSelectedVehicle] = useState(selectedVehicle);

  // cargar el vehiculo seleccionado del almacenamiento local cuando el componente se monta
  useEffect(() => {
    const storedVehicle = localStorage.getItem('selectedVehicle');
    if (storedVehicle) {
      setCurrentSelectedVehicle(JSON.parse(storedVehicle));

      localStorage.removeItem('selectedVehicle');
    }
  }, []);

  useEffect(() => {
    // actualiza el vehiculo seleccionado cuando cambia desde el Navbar
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
        <div className="vehicle-details container">
          <h2 className="text-center font-weight-bold mb-4">Detalles de Vehículo</h2>
          <div className="row detail-row">
            <span className="col-6 font-weight-bold">Numero de servicio:</span>
            <span className="col-6">{currentSelectedVehicle.servicioNumber}</span>
          </div>
          <div className="row detail-row">
            <span className="col-6 font-weight-bold">Marca:</span>
            <span className="col-6">{currentSelectedVehicle.marca}</span>
          </div>
          <div className="row detail-row">
            <span className="col-6 font-weight-bold">Modelo:</span>
            <span className="col-6">{currentSelectedVehicle.modelo}</span>
          </div>
          <div className="row detail-row">
            <span className="col-6 font-weight-bold">Cliente:</span>
            <span className="col-6">{currentSelectedVehicle.cliente}</span>
          </div>
          <div className="row detail-row">
            <span className="col-6 font-weight-bold">Patente:</span>
            <span className="col-6">{currentSelectedVehicle.patente}</span>
          </div>
          <div className="row detail-row">
            <span className="col-6 font-weight-bold">Cilindrada:</span>
            <span className="col-6">{currentSelectedVehicle.cilindrada}</span>
          </div>
          <div className="row detail-row">
            <span className="col-6 font-weight-bold">Ultimo Cambio de Aceite:</span>
            <span className="col-6">{currentSelectedVehicle.ultimoCambioAceite}</span>
          </div>
          <div className="row detail-row">
            <span className="col-6 font-weight-bold">Kilometraje:</span>
            <span className="col-6">{currentSelectedVehicle.kilometraje}</span>
          </div>
          <div className="row detail-row">
            <span className="col-6 font-weight-bold">Color:</span>
            <span className="col-6">{currentSelectedVehicle.color}</span>
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
