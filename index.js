const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let products = [
  {
    id: 1,
    name: "Jarrón antiguo",
    description: "Jarrón de porcelana del siglo XIX",
    price: 120.50,
    stock: 2,
    category: "Decoración",
    image_url: "https://ejemplo.com/jarron.jpg"
  }
];

// Listar todos los productos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Obtener un producto por ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
});

// Crear un producto
app.post('/api/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar un producto
app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Producto no encontrado" });
  products[idx] = { ...products[idx], ...req.body };
  res.json(products[idx]);
});

// Eliminar un producto
app.delete('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Producto no encontrado" });
  products.splice(idx, 1);
  res.status(204).send();
});

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml'); // <-- asegúrate que la ruta es correcta

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});