const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Datos simulados para pruebas iniciales
const libros = [
    { id: 1, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", precio: 15.50, existencias: 10 },
    { id: 2, titulo: "1984", autor: "George Orwell", precio: 20.00, existencias: 5 }
];

// Endpoint: Consultar catálogo
app.get('/', (req, res) => {
    res.json(libros); 
});

// Endpoint: Búsqueda y filtrado por autor o título
app.get('/buscar', (req, res) => {
    const { q } = req.query;
    const filtrados = libros.filter(l => 
        l.titulo.toLowerCase().includes(q.toLowerCase()) || 
        l.autor.toLowerCase().includes(q.toLowerCase())
    );
    res.json(filtrados);
});

app.listen(PORT, () => console.log(`Microservicio de Libros en puerto ${PORT}`));