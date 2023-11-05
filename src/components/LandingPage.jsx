// LandingPage.jsx
import { useState } from 'react';

function LandingPage({ registros, history }) {
  const [patente, setPatente] = useState('');

  const buscarPorPatente = () => {
    const vehiculoEncontrado = registros.find((registro) => registro.patente === patente);

    if (vehiculoEncontrado) {
      history.push(`/vehicle/${vehiculoEncontrado.servicioNumber}`);
    } else {
      alert('Vehículo no encontrado');
    }
  }

  return (
    <div>
      <h2>Búsqueda de Vehículo por Patente</h2>
      <input
        type="text"
        placeholder="Patente"
        value={patente}
        onChange={(e) => setPatente(e.target.value)}
      />
      <button onClick={buscarPorPatente}>Buscar</button>
    </div>
  );
}

export default LandingPage;
