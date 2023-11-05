import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function VehicleDetailPage({ registros }) {
    const { id } = useParams();
    const [vehiculo, setVehiculo] = useState(null);
    const [nuevoTrabajo, setNuevoTrabajo] = useState('');

    useEffect(() => {
        const vehiculoEncontrado = registros.find(
            (registro) => registro.servicioNumber && registro.servicioNumber.toString() === id
        );

        if (vehiculoEncontrado) {
            setVehiculo(vehiculoEncontrado);
            if (!vehiculoEncontrado.trabajos) {
                vehiculoEncontrado.trabajos = [];
            }
        }
    }, [id, registros]);

    const agregarTrabajo = () => {
        if (nuevoTrabajo.trim() === '') {
            return;
        }

        const trabajo = {
            descripcion: nuevoTrabajo,
            fecha: new Date().toLocaleDateString(),
        };

        if (vehiculo && vehiculo.trabajos) {
            vehiculo.trabajos.push(trabajo);
        }

        setNuevoTrabajo('');
    };

    return (
        <div>
            <h2>Detalles del Vehículo</h2>
            <p>Nombre del Vehículo: {vehiculo && `${vehiculo.marca} ${vehiculo.modelo} - ${vehiculo.patente}`}</p>
            <p>Patente: {vehiculo && vehiculo.patente}</p>
            <p>Marca: {vehiculo && vehiculo.marca}</p>
            <p>Modelo: {vehiculo && vehiculo.modelo}</p>
            <p>Cliente: {vehiculo && vehiculo.cliente}</p>
            <p>Cilindrada: {vehiculo && vehiculo.cilindrada}</p>
            <p>Año de Fabricación: {vehiculo && vehiculo.anioFabricacion}</p>
            <p>Último Cambio de Aceite: {vehiculo && vehiculo.ultimoCambioAceite}</p>
            <p>Kilometraje: {vehiculo && vehiculo.kilometraje}</p>
            <p>Color: {vehiculo && vehiculo.color}</p>

            <h3>Lista de trabajos:</h3>
            <ul>
                {vehiculo &&
                    vehiculo.trabajos &&
                    vehiculo.trabajos.map((trabajo, index) => (
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
        </div>
    );
}

export default VehicleDetailPage;
