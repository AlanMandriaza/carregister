import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../styles/RegisterForm.css';

function NewRegisterForm({ onSubmit }) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cliente, setCliente] = useState('');
  const [patente, setPatente] = useState('');
  const [cilindrada, setCilindrada] = useState('');
  const [anioFabricacion, setAnioFabricacion] = useState('');
  const [ultimoCambioAceite, setUltimoCambioAceite] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [color, setColor] = useState('');

  const [showModal, setShowModal] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const servicioNumber = new Date().toISOString().replace(/[:.-]/g, '');
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
    setShowModal(true); 
    resetForm(); 
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
  };

  return (
    <div>
      <h2>Registro de Vehículo</h2>
      <form style={{ maxWidth: '400px', margin: '20px auto' }} onSubmit={handleRegister}>
        {/* Form fields for vehicle registration */}
        <div className="mb-3">
          <label htmlFor="marca" className="form-label">Marca:</label>
          <input
            type="text"
            className="form-control"
            id="marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="modelo" className="form-label">Modelo:</label>
          <input
            type="text"
            className="form-control"
            id="modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cliente" className="form-label">Cliente:</label>
          <input
            type="text"
            className="form-control"
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="patente" className="form-label">Patente:</label>
          <input
            type="text"
            className="form-control"
            id="patente"
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cilindrada" className="form-label">Cilindrada:</label>
          <input
            type="text"
            className="form-control"
            id="cilindrada"
            value={cilindrada}
            onChange={(e) => setCilindrada(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="anioFabricacion" className="form-label">Año de Fabricación:</label>
          <input
            type="text"
            className="form-control"
            id="anioFabricacion"
            value={anioFabricacion}
            onChange={(e) => setAnioFabricacion(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ultimoCambioAceite" className="form-label">Último Cambio de Aceite:</label>
          <input
            type="text"
            className="form-control"
            id="ultimoCambioAceite"
            value={ultimoCambioAceite}
            onChange={(e) => setUltimoCambioAceite(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="kilometraje" className="form-label">Kilometraje:</label>
          <input
            type="text"
            className="form-control"
            id="kilometraje"
            value={kilometraje}
            onChange={(e) => setKilometraje(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color:</label>
          <input
            type="text"
            className="form-control"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrar Vehículo</button>
      </form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Vehículo Registrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>El vehículo ha sido registrado con éxito.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewRegisterForm;
