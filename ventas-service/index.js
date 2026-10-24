const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const ventas = [];

// Endpoint: Registrar transacción de venta
app.post('/', (req, res) => {
    const { libroId, cantidad } = req.body;
    ventas.push({ libroId, cantidad, fecha: new Date() });
    res.status(201).json({ mensaje: "Venta registrada exitosamente" });
});

// Endpoint: Consultar ranking de más vendidos
app.get('/top', (req, res) => {
    res.json({ mensaje: "Lógica de agrupación de ventas en construcción" }); 
});

app.listen(PORT, () => console.log(`Microservicio de Ventas en puerto ${PORT}`));