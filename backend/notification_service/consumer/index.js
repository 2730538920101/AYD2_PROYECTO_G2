const express = require('express');
const cors = require('cors');  // Importar cors
const config = require('./src/config/config');
const CheckRoutes = require('./src/routes/checkRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const errorHandler = require('./src/utils/errorHandler');

const app = express();
// Configurar CORS para aceptar cualquier origen
app.use(cors());

app.use(express.json());
app.use('/api/consume/', mainRoutes);
app.use('/api/consume/notifications/', CheckRoutes);

// Middleware de manejo de errores
app.use(errorHandler);


app.listen(config.server.port, () => {
  console.log(`Producer service running on port ${config.server.port}`);
});
