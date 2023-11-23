import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ registros }) {
  const cantidadRegistros = registros ? registros.length : 0;

  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/" className="nav-link active" aria-current="page">Inicio</Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">Registrar nuevo Vehículo</Link>
      </li>
      <li className="nav-item">
        <Link to="/vehicles" className="nav-link">
          Ver Vehículos Registrados ({cantidadRegistros})
        </Link>
      </li>
    </ul>
  );
}


Navbar.propTypes = {
  registros: PropTypes.array
};

export default Navbar;
