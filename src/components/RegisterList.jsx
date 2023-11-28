import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Requeriments from './Requeriments';

import '../styles/RegisterForm.css';
import '../styles/RegisterList.css';

function RegisterList() {
  const [registros, setRegistros] = useState([]);
  const [currentSelectedVehicle, setCurrentSelectedVehicle] = useState(null);

  // Función para cargar los registros de vehículos
  const cargarRegistros = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehiculos');
      setRegistros(response.data);
      // Si hay vehículos, selecciona el primero por defecto
      if (response.data.length > 0) {
        setCurrentSelectedVehicle(response.data[0]);
      }
    } catch (error) {
      console.error('Error al obtener los registros de vehículos:', error);
    }
  };

  // Cargar registros al montar el componente
  useEffect(() => {
    cargarRegistros();
  }, []);

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
        <div className="jobs-container">
            <h3>Trabajos Asociados</h3>
            <ul>
              {currentSelectedVehicle.trabajos && currentSelectedVehicle.trabajos.map((job, index) => (
                <li key={index}>{job.descripcion}</li>
              ))}
            </ul>
          </div>
      </div>
      )}
      {currentSelectedVehicle && (
        <Requeriments
          selectedVehicle={currentSelectedVehicle}
          jobs={currentSelectedVehicle.trabajos || []}
        />
      )}

      {registros.length === 0 && <div><h3>Sin registros</h3></div>}
    </div>
  );
}

export default RegisterList;
