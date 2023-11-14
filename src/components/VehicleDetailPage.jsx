import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function VehicleDetailPage({ registros }) {
    const { servicioNumber } = useParams();
    const [vehiculo, setVehiculo] = useState(null);
    const [nuevoTrabajo, setNuevoTrabajo] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
    
        const vehiculoEncontrado = registros.find(
            (registro) => registro.servicioNumber === servicioNumber
        );

        if (vehiculoEncontrado) {
            setVehiculo({ ...vehiculoEncontrado, trabajos: vehiculoEncontrado.trabajos || [] });
        }
    }, [servicioNumber, registros]);

    const agregarTrabajo = () => {
        if (nuevoTrabajo.trim() === '') return;
        const trabajo = { descripcion: nuevoTrabajo, fecha: new Date().toLocaleDateString() };

        setVehiculo((prevVehiculo) => ({
            ...prevVehiculo,
            trabajos: prevVehiculo.trabajos ? [...prevVehiculo.trabajos, trabajo] : [trabajo],
        }));

        setNuevoTrabajo('');
        setModalIsOpen(false); 
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    if (!vehiculo) {
        
        return <div>No vehicle found with this service number: {servicioNumber}</div>;
    }

    return (
        <div>
            <button onClick={openModal}>Mostrar Detalles</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Detalles del Vehículo">
                <>
                    <p>Nombre del Vehículo: {`${vehiculo.marca} ${vehiculo.modelo} - ${vehiculo.patente}`}</p>
                    <h3>Lista de trabajos:</h3>
                    <ul>
                        {vehiculo.trabajos.map((trabajo, index) => (
                            <li key={index}>
                                {trabajo.descripcion} (Fecha: {trabajo.fecha})
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Nuevo Trabajo"
                        value={nuevoTrabajo}
                        onChange={(e) => setNuevoTrabajo(e.target.value)}
                    />
                    <button onClick={agregarTrabajo}>Agregar Trabajo</button>
                    <button onClick={closeModal}>Cerrar</button>
                </>
            </Modal>
        </div>
    );
}

export default VehicleDetailPage;
