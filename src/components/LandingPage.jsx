import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import RegisterList from './RegisterList';
import VehicleDetailPage from './VehicleDetailPage';

function LandingPage() {
    const [registros, setRegistros] = useState([
        {
          marca: 'Honda',
          modelo: 'Civic',
          cliente: 'Alice Smith',
          patente: 'XYZ789',
          cilindrada: '1600 cc',
          anioFabricacion: '2022',
          ultimoCambioAceite: '2023-10-20',
          kilometraje: '25000 km',
          color: 'Blanco',
        },
        {
          marca: 'Toyota',
          modelo: 'Corolla',
          cliente: 'John Doe',
          patente: 'ABC123',
          cilindrada: '1800 cc',
          anioFabricacion: '2021',
          ultimoCambioAceite: '2023-09-15',
          kilometraje: '22000 km',
          color: 'Rojo',
        },
        {
          marca: 'Ford',
          modelo: 'Focus',
          cliente: 'Sarah Johnson',
          patente: 'DEF456',
          cilindrada: '2000 cc',
          anioFabricacion: '2020',
          ultimoCambioAceite: '2023-08-05',
          kilometraje: '28000 km',
          color: 'Azul',
        },
        {
          marca: 'Chevrolet',
          modelo: 'Cruze',
          cliente: 'Michael Brown',
          patente: 'GHI789',
          cilindrada: '1700 cc',
          anioFabricacion: '2019',
          ultimoCambioAceite: '2023-07-12',
          kilometraje: '21000 km',
          color: 'Negro',
        },
        {
          marca: 'Volkswagen',
          modelo: 'Golf',
          cliente: 'Emily Davis',
          patente: 'JKL101',
          cilindrada: '1900 cc',
          anioFabricacion: '2022',
          ultimoCambioAceite: '2023-09-28',
          kilometraje: '24000 km',
          color: 'Plata',
        },
        {
          marca: 'Hyundai',
          modelo: 'Elantra',
          cliente: 'Daniel Wilson',
          patente: 'MNO202',
          cilindrada: '1800 cc',
          anioFabricacion: '2021',
          ultimoCambioAceite: '2023-10-05',
          kilometraje: '23000 km',
          color: 'Verde',
        },
        {
          marca: 'Kia',
          modelo: 'Soul',
          cliente: 'Olivia Lee',
          patente: 'PQR303',
          cilindrada: '1600 cc',
          anioFabricacion: '2020',
          ultimoCambioAceite: '2023-08-20',
          kilometraje: '26000 km',
          color: 'Amarillo',
        },
        {
          marca: 'Nissan',
          modelo: 'Sentra',
          cliente: 'William Martinez',
          patente: 'STU404',
          cilindrada: '2000 cc',
          anioFabricacion: '2019',
          ultimoCambioAceite: '2023-07-05',
          kilometraje: '22000 km',
          color: 'Gris',
        },
        {
          marca: 'Subaru',
          modelo: 'Impreza',
          cliente: 'Ava Jones',
          patente: 'VWX505',
          cilindrada: '1800 cc',
          anioFabricacion: '2022',
          ultimoCambioAceite: '2023-10-15',
          kilometraje: '25000 km',
          color: 'Azul Oscuro',
        },
        {
          marca: 'Mazda',
          modelo: 'Mazda3',
          cliente: 'Ethan Miller',
          patente: 'YZA606',
          cilindrada: '1700 cc',
          anioFabricacion: '2021',
          ultimoCambioAceite: '2023-09-10',
          kilometraje: '21000 km',
          color: 'Rojo Brillante',
        },
    ]);
    const [activeOption, setActiveOption] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null); // New state for selected vehicle
    const [searchTerm, setSearchTerm] = useState('');

    const handleOptionClick = (option) => {
        setActiveOption(option);
        setSelectedVehicle(null); // Clear selected vehicle when changing options
    };

    const handleCarRegistration = (newRegistro) => {
        setRegistros([...registros, newRegistro]);
    };

    const handleVehicleDetails = (vehicle) => {
        setSelectedVehicle(vehicle);
        setActiveOption('vehicle-details');
    };

    const handleSearch = () => {
        // Implement your search logic here
        // You can filter the registros array based on the searchTerm
        // and display the filtered list in the "Buscar Autos" option
    };

    return (
        <div className="landing-page">
            <div className="container">
                <div className="left-sidebar">
                    <h2>Opciones</h2>
                    <button
                        className={`button ${activeOption === 'register' ? 'active-button' : ''}`}
                        onClick={() => handleOptionClick('register')}
                    >
                        Registrar un Auto
                    </button>
                    <button
                        className={`button ${activeOption === 'vehicle-list' ? 'active-button' : ''}`}
                        onClick={() => handleOptionClick('vehicle-list')}
                    >
                        Mostrar Autos Registrados
                    </button>
                    <button
                        className={`button ${activeOption === 'search' ? 'active-button' : ''}`}
                        onClick={() => handleOptionClick('search')}
                    >
                        Buscar Autos
                    </button>
                </div>
                <div className="main-content">
                    {activeOption === 'register' && (
                        <div className="content-box">
                            <RegisterForm onSubmit={handleCarRegistration} />
                        </div>
                    )}
                    {activeOption === 'vehicle-list' && (
                        <div className="content-box">
                            <RegisterList registros={registros} onVehicleDetails={handleVehicleDetails} />
                        </div>
                    )}
                    {activeOption === 'search' && (
                        <div className="content-box">
                            <input
                                type="text"
                                placeholder="Buscar vehículo"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button onClick={handleSearch}>Buscar</button>
                            {/* Implement your search results here */}
                        </div>
                    )}
                    {activeOption === 'vehicle-details' && selectedVehicle && (
                        <div className="content-box">
                            <VehicleDetailPage vehicle={selectedVehicle} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
