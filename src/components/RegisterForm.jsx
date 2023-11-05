import React, { useState } from 'react';
import '../styles/RegisterForm.css';

function RegisterForm({ onSubmit }) {
  const [nombre, setNombre] = useState('');
  const [marcaAuto, setMarcaAuto] = useState('');
  const [modeloAuto, setModeloAuto] = useState('');
  const [anoAuto, setAnoAuto] = useState('');
  const [matriculaAuto, setMatriculaAuto] = useState('');
  const [descripcionAuto, setDescripcionAuto] = useState('');
  const [fotoAuto, setFotoAuto] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const registro = {
      nombre,
      marcaAuto,
      modeloAuto,
      anoAuto,
      matriculaAuto,
      descripcionAuto,
      fotoAuto,
    };
    onSubmit(registro);
    setNombre('');
    setMarcaAuto('');
    setModeloAuto('');
    setAnoAuto('');
    setMatriculaAuto('');
    setDescripcionAuto('');
    setFotoAuto(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFotoAuto(URL.createObjectURL(file));
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Nombre del Cliente:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </label>
        <label>
          Marca del Auto:
          <input type="text" value={marcaAuto} onChange={(e) => setMarcaAuto(e.target.value)} />
        </label>
        <label>
          Modelo del Auto:
          <input type="text" value={modeloAuto} onChange={(e) => setModeloAuto(e.target.value)} />
        </label>
        <label>
          Año del Auto:
          <input type="text" value={anoAuto} onChange={(e) => setAnoAuto(e.target.value)} />
        </label>
        <label>
          Número de Matrícula:
          <input type="text" value={matriculaAuto} onChange={(e) => setMatriculaAuto(e.target.value)} />
        </label>
        <label>
          Descripción del Auto:
          <textarea value={descripcionAuto} onChange={(e) => setDescripcionAuto(e.target.value)} />
        </label>
        <label>
          Foto del Auto:
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
        <button type="submit">Registrar</button>
      </form>
      {fotoAuto && (
        <div className="image-preview">
          <img className="auto-image" src={fotoAuto} alt="Foto del Auto" />
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
