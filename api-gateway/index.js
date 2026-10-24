const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/libros', async (req, res) => {
    try {
        // En Docker, el hostname "libros-service" resolverá al contenedor adecuado
        const response = await fetch(`http://libros-service:3000${req.url}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error comunicando con el microservicio de libros' });
    }
});

app.use('/api/ventas', async (req, res) => {
    try {
        const response = await fetch(`http://ventas-service:3000${req.url}`, {
            method: req.method,
            body: req.method === 'POST' ? JSON.stringify(req.body) : null,
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error comunicando con el microservicio de ventas' });
    }
});

app.listen(PORT, () => console.log(`API Gateway corriendo en puerto ${PORT}`));