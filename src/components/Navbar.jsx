import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/" className="nav-link active" aria-current="page">Inicio</Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">Registrar nuevo Vehículo</Link>
      </li>
      <li className="nav-item">
        <Link to="/vehicles" className="nav-link">Ver Vehículos Registrados</Link>
      </li>
    </ul>
  );
}

export default Navbar;
