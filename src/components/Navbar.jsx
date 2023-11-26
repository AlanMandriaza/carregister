import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/RegisterForm.css';

function Navbar({ registros, selectedVehicle, setSelectedVehicle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const [selectedSearchVehicle, setSelectedSearchVehicle] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm('');
        setShowPopover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const handleSearchInputChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchTerm(searchText);

    const filtered = registros.filter((vehiculo) =>
      vehiculo.marca.toLowerCase().includes(searchText) ||
      vehiculo.modelo.toLowerCase().includes(searchText)
    );

    setFilteredRegistros(filtered);
    setShowPopover(true);
  };

  const handleVehicleClick = (vehiculo) => {
    setSelectedSearchVehicle(vehiculo);
    setSelectedVehicle(vehiculo);
    localStorage.setItem('selectedVehicle', JSON.stringify(vehiculo));
    navigate('/vehicles', { replace: true, state: { forcedReload: true } });
    setShowPopover(false);
  };

  const cantidadRegistros = registros ? registros.length : 0;

  // Función para redirigir al inicio de la aplicación
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={navigateToHome}>
          Inicio
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
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
              <div ref={searchRef} className="position-relative">
                <input
                  type="search"
                  className="form-control mr-sm-2"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                {showPopover && (
                  <div className="custom-popover">
                    {filteredRegistros.length > 0 ? (
                      <ul className="list-unstyled custom-dropdown">
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
                    ) : (
                      <div>No se encontraron resultados</div>
                    )}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  registros: PropTypes.array,
  selectedVehicle: PropTypes.object,
  setSelectedVehicle: PropTypes.func,
};

export default Navbar;
