const express = require('express');
const cors = require('cors');  // Importar cors
const config = require('./src/config/config');
const authRoutes = require('./src/routes/authRoutes');
const mainRoutes = require('./src/routes/mainRoutes');
const errorHandler = require('./src/utils/errorHandler');

const app = express();

// Configurar CORS para aceptar cualquier origen
app.use(cors());

app.use(express.json());

app.use('/api/authorization/', mainRoutes);
app.use('/api/authorization/auth/', authRoutes);

app.use(errorHandler);

app.listen(config.server.port, () => {
  console.log(`Auth service running on port ${config.server.port}`);
});
