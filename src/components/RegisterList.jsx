import React from 'react';

function RegisterList({ registros }) {
  return (
    <div>
      <h2>Lista de Registros</h2>
      <ul>
        {registros.map((registro, index) => (
          <li key={index}>
            <strong>Nombre del Cliente:</strong> {registro.nombre}<br />
            <strong>Marca del Auto:</strong> {registro.marcaAuto}<br />
            <strong>Modelo del Auto:</strong> {registro.modeloAuto}<br />
            <strong>Año del Auto:</strong> {registro.anoAuto}<br />
            <strong>Número de Matrícula:</strong> {registro.matriculaAuto}<br />
            <strong>Descripción del Auto:</strong> {registro.descripcionAuto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RegisterList;
