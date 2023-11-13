import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (newRegistro) => {
    console.log('Nuevo Registro:', newRegistro);
  };

  const handleOpenForm = () => {
    setFormVisible(true);
    setModalIsOpen(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
    setModalIsOpen(false);
  };

  return (
    <div>
      <h1>Mi Aplicación</h1>
      {!isFormVisible && (
        <button onClick={handleOpenForm}>Abrir Formulario</button>
      )}
      {isFormVisible && (
        <RegisterForm
          isOpen={modalIsOpen}
          onRequestClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;
