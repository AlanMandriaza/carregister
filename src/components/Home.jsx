import React, { useState } from 'react';

function Home({ registros }) {
  // Estilo CSS para la imagen de fondo
  const backgroundStyle = {
    backgroundImage: 'url("https://lumiere-a.akamaihd.net/v1/images/cars80-1200x801_7b6d9330.jpeg?region=0,93,1200,676&width=768")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '400px', // Altura de la imagen de fondo
  };

  return (
    <div style={backgroundStyle}>
      {/* Contenido de tu página de inicio */}
    </div>
  );
}

export default Home;
