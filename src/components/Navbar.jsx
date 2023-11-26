import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navbar({ registros, selectedVehicle, setSelectedVehicle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [selectedSearchVehicle, setSelectedSearchVehicle] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm('');
        setFilteredRegistros([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredRegistros(
      registros.filter((vehiculo) =>
        vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleVehicleClick = (vehiculo) => {
    setSelectedSearchVehicle(vehiculo);
    setSelectedVehicle(vehiculo); // Actualiza el vehículo seleccionado en RegisterList
    localStorage.setItem('selectedVehicle', JSON.stringify(vehiculo));
    navigate('/vehicles', { replace: true, state: { forcedReload: true } });
  };

  const cantidadRegistros = registros ? registros.length : 0;

  return (
    <div>
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page">
            Inicio
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Registrar nuevo Vehículo
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/vehicles" className="nav-link">
            Ver Vehículos Registrados ({cantidadRegistros})
          </Link>
        </li>
        <li className="nav-item">
          <form onSubmit={handleSearch} ref={searchRef}>
            <input
              type="search"
              placeholder="Buscar por Marca o Modelo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Buscar</button>
            {filteredRegistros.length > 0 && (
              <ul>
                {filteredRegistros.map((vehiculo) => (
                  <li
                    key={vehiculo.servicioNumber}
                    onClick={() => handleVehicleClick(vehiculo)}
                    className={
                      selectedVehicle &&
                      vehiculo.servicioNumber === selectedVehicle.servicioNumber
                        ? 'selected'
                        : ''
                    }
                  >
                    {`${vehiculo.marca} ${vehiculo.modelo}`}
                  </li>
                ))}
              </ul>
            )}
          </form>
        </li>
      </ul>
    </div>
  );
}

Navbar.propTypes = {
  registros: PropTypes.array,
  selectedVehicle: PropTypes.object, // Asegúrate de que el prop selectedVehicle sea un objeto
  setSelectedVehicle: PropTypes.func, // Asegúrate de que el prop setSelectedVehicle sea una función
};

export default Navbar;
