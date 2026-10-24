import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios.get('http://98.86.131.227/api/libros')
      .then(res => setLibros(res.data))
      .catch(err => console.error("Error al obtener libros:", err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Catálogo de Libros</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {libros.map(libro => (
          <div key={libro.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3>{libro.titulo}</h3>
            <p><b>Autor:</b> {libro.autor}</p>
            <p><b>Precio:</b> ${libro.precio}</p>
            <p><b>Existencias:</b> {libro.existencias}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;