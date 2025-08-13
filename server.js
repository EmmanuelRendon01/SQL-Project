import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import csvRoutes from './app/routes/csvRoutes.js'
import billRoutes from './app/routes/billsRoutes.js'
import customerRoutes from './app/routes/customersRoutes.js'

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Crea una instancia de Express
const app = express();

// El middleware cors configura las cabeceras HTTP para que el servidor permita que otros dominios (orígenes) puedan hacer peticiones.
app.use(cors());

//  es un middleware que procesa las peticiones entrantes con cuerpo JSON para que se pueda acceder a req.body como un objeto JavaScript.
app.use(express.json());

// Configura las rutas para el endpoint
app.use('/api/files', csvRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/customers', customerRoutes);

// Configura el puerto de la aplicación, tomando la variable de entorno o el valor por defecto (3000)
const PORT = process.env.PORT || 9000;

// Levanta el servidor y escucha en el puerto definido
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});