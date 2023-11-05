import React, { useState } from 'react';

function RegisterForm({ onSubmit }) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cliente, setCliente] = useState('');
  const [patente, setPatente] = useState('');
  const [cilindrada, setCilindrada] = useState('');
  const [anioFabricacion, setAnioFabricacion] = useState('');
  const [ultimoCambioAceite, setUltimoCambioAceite] = useState('');
  const [kilometraje, setKilometraje] = useState('');
  const [color, setColor] = useState('');

  const handleRegister = () => {
    const servicioNumber = Date.now();
    const nombreRegistro = `${marca} ${modelo} - ${patente}`;
    const nuevoRegistro = {
      nombreRegistro, // Use the combined name as the registro's name
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
    // Restablece los campos de entrada
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
      <input
        type="text"
        placeholder="Marca"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
      />
      <input
        type="text"
        placeholder="Modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />
      <input
        type="text"
        placeholder="Patente"
        value={patente}
        onChange={(e) => setPatente(e.target.value)}
      />
      <input
        type="text"
        placeholder="Cilindrada"
        value={cilindrada}
        onChange={(e) => setCilindrada(e.target.value)}
      />
      <input
        type="text"
        placeholder="Año de Fabricación"
        value={anioFabricacion}
        onChange={(e) => setAnioFabricacion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Último Cambio de Aceite"
        value={ultimoCambioAceite}
        onChange={(e) => setUltimoCambioAceite(e.target.value)}
      />
      <input
        type="text"
        placeholder="Kilometraje"
        value={kilometraje}
        onChange={(e) => setKilometraje(e.target.value)}
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar Vehículo</button>
    </div>
  );
}

export default RegisterForm;
