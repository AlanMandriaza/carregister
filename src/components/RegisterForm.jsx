import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/RegisterForm.css';

Modal.setAppElement('#root');

function RegisterForm({ onSubmit, isOpen, onRequestClose }) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cliente, setCliente] = useState('');
  const [patente, setPatente] = useState('');
  const [cilindrada, setCilindrada] = useState('');
  const [anioFabricacion, setAnioFabricacion] = useState('');
  const [ultimoCambioAceite, setUltimoCambioAceite] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [color, setColor] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleRegister = () => {
    const servicioNumber = Date.now();
    const nombreRegistro = `${marca} ${modelo} - ${patente}`;
    const nuevoRegistro = {
      nombreRegistro,
      marca,
      modelo,
      cliente,
      patente,
      cilindrada,
      anioFabricacion,
      ultimoCambioAceite,
      kilometraje,
      color,
      servicioNumber,
    };

    onSubmit(nuevoRegistro);
    resetForm();
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setMarca('');
    setModelo('');
    setCliente('');
    setPatente('');
    setCilindrada('');
    setAnioFabricacion('');
    setUltimoCambioAceite('');
    setKilometraje('');
    setColor('');
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Registro de Vehículo"
    >
      <h2>Registro de Vehículo</h2>
      <div className="form-row">
        <div className="form-item">
          
          <input
            type="text"
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>
        <div className="form-item">
          
          <input
            type="text"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>
        <div className="form-item">
          
          <input
            type="text"
            placeholder="Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>
        <div className="form-item">
        
          <input
            type="text"
            placeholder="Patente"
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
          />
        </div>
        <div className="form-item">
          
          <input
            type="text"
            placeholder="Cilindrada"
            value={cilindrada}
            onChange={(e) => setCilindrada(e.target.value)}
          />
        </div>
        <div className="form-item">
        
          <input
            type="text"
            placeholder="Año de Fabricación"
            value={anioFabricacion}
            onChange={(e) => setAnioFabricacion(e.target.value)}
          />
        </div>
        <div className="form-item">
         
          <input
            type="text"
            placeholder="Último Cambio de Aceite"
            value={ultimoCambioAceite}
            onChange={(e) => setUltimoCambioAceite(e.target.value)}
          />
        </div>
        <div className="form-item">
          
          <input
            type="text"
            placeholder="Kilometraje"
            value={kilometraje}
            onChange={(e) => setKilometraje(e.target.value)}
          />
        </div>
        <div className="form-item">
        
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
      </div>
      <div className="form-buttons">
        <button
          onClick={handleRegister}
          style={{ backgroundColor: formSubmitted ? 'green' : 'default' }}
        >
          {formSubmitted ? 'Enviado' : 'Registrar Vehículo'}
        </button>
        <button onClick={onRequestClose}>Cerrar</button>
      </div>
    </Modal>
  );
}

export default RegisterForm;
