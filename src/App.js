// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import RegisterList from './components/RegisterList';
import VehicleDetailPage from './components/VehicleDetailPage';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  const [registros, setRegistros] = useState([]);

  const handleRegistroSubmit = (registro) => {
    setRegistros([...registros, registro]);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage registros={registros} />
              <RegisterForm onSubmit={handleRegistroSubmit} />
              <RegisterList registros={registros} />
            </>
          }/>
          <Route path="/vehicle/:id" element={<VehicleDetailPage registros={registros} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
