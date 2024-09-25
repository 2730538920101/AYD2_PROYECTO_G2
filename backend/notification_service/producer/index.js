const express = require('express');
const cors = require('cors');  // Importar cors
const config = require('./src/config/config');
const notificationRoutes = require('./src/routes/notificationRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const errorHandler = require('./src/utils/errorHandler');

const app = express();
// Configurar CORS para aceptar cualquier origen
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para manejar JSON si lo necesitas

app.use('/api/producer/', mainRoutes);
app.use('/api/producer/notify/', notificationRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(config.server.port, () => {
  console.log(`Producer service running on port ${config.server.port}`);
});
