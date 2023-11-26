import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewRegisterForm from './components/NewRegisterForm';
import RegisterList from './components/RegisterList';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  const [registros, setRegistros] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Vehículo seleccionado en RegisterList
  const [selectedSearchVehicle, setSelectedSearchVehicle] = useState(null); // Vehículo seleccionado en la búsqueda del Navbar

  const handleSubmit = (newRegistro) => {
    setRegistros((prevRegistros) => [...prevRegistros, newRegistro]);
  };

  const handleSearch = (vehiculo) => {
    setSelectedSearchVehicle(vehiculo);
  };

  return (
    <Router>
      <Navbar registros={registros} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} />

      <Routes>
        <Route path="/" element={<Home registros={registros} />} />
        <Route path="/register" element={<NewRegisterForm onSubmit={handleSubmit} />} />
        <Route
          path="/vehicles"
          element={<RegisterList registros={registros} selectedVehicle={selectedVehicle} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
