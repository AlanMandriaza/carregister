import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm.jsx';
import RegisterList from './components/RegisterList.jsx';

function App() {
  const [registros, setRegistros] = useState([]);

  const handleRegistroSubmit = (registro) => {
    setRegistros([...registros, registro]);
  };

  return (
    <div>
      <h1>Registro de Clientes y Autos</h1>
      <RegisterForm onSubmit={handleRegistroSubmit} />
      <RegisterList registros={registros} />
    </div>
  );
}

export default App;
