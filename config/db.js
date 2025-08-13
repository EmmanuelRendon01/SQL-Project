import { Pool } from 'pg';
import dotenv from 'dotenv';
// Import necessary libraries

// use dotenv to use enviroment variables
dotenv.config();

// Use pool to use postgresql db
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Export pool
export default pool;