import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import csvRoutes from './app/routes/csvRoutes.js'
import billRoutes from './app/routes/billsRoutes.js'
import customerRoutes from './app/routes/customersRoutes.js'

// Load environment variables from .env file
dotenv.config();

// Create an Express instance

const app = express();

// The cors middleware configures HTTP headers so that the server allows other domains (origins) to make requests.
app.use(cors());

// Is a middleware that processes incoming requests with a JSON body so that req.body can be accessed as a JavaScript object.
app.use(express.json());

// Configure routes for the endpoint
app.use('/api/files', csvRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/customers', customerRoutes);

// Configure the application port, taking the environment variable or the default value (3000)
const PORT = process.env.PORT || 9000;

// Raise the server and listen on the defined port

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});