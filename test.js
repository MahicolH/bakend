const express = require('express');
const app = express();
app.use(express.json());

// --- Agrega estas líneas ---
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// --- Fin de líneas agregadas ---

let antiguedades = [];
let nextId = 1;

// Obtener todas las antigüedades
app.get('/antiguedades', (req, res) => {
  res.json(antiguedades);
});

// Crear una nueva antigüedad
app.post('/antiguedades', (req, res) => {
  const { nombre, descripcion, año, valor } = req.body;
  if (!nombre || !descripcion || !año || !valor) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos.' });
  }
  const nueva = { id: String(nextId++), nombre, descripcion, año, valor };
  antiguedades.push(nueva);
  res.status(201).json(nueva);
});

// Obtener una antigüedad por ID
app.get('/antiguedades/:id', (req, res) => {
  const ant = antiguedades.find(a => a.id === req.params.id);
  if (!ant) return res.status(404).json({ mensaje: 'Antigüedad no encontrada.' });
  res.json(ant);
});

// Actualizar una antigüedad
app.put('/antiguedades/:id', (req, res) => {
  const ant = antiguedades.find(a => a.id === req.params.id);
  if (!ant) return res.status(404).json({ mensaje: 'Antigüedad no encontrada.' });
  const { nombre, descripcion, año, valor } = req.body;
  if (!nombre || !descripcion || !año || !valor) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos.' });
  }
  ant.nombre = nombre;
  ant.descripcion = descripcion;
  ant.año = año;
  ant.valor = valor;
  res.json(ant);
});

// Eliminar una antigüedad
app.delete('/antiguedades/:id', (req, res) => {
  const index = antiguedades.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ mensaje: 'Antigüedad no encontrada.' });
  antiguedades.splice(index, 1);
  res.json({ mensaje: 'Antigüedad eliminada exitosamente.' });
});

app.listen(3000, () => {
  console.log('Servidor de antigüedades corriendo en http://localhost:3000');
});