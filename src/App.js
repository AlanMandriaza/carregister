import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewRegisterForm from './components/NewRegisterForm';
import RegisterList from './components/RegisterList';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
    const [registros, setRegistros] = useState([]);

    const handleSubmit = (newRegistro) => {
        setRegistros((prevRegistros) => [...prevRegistros, newRegistro]);
    };

    return (
        <Router>
            <Navbar registros={registros} />
            <Routes>
                <Route path="/" element={<Home registros={registros} />} />
                <Route path="/register" element={<NewRegisterForm onSubmit={handleSubmit} />} />
                <Route path="/vehicles" element={<RegisterList registros={registros} />} />
            </Routes>
        </Router>
    );
}

export default App;
