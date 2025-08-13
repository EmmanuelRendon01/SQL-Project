import express from 'express';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import pool from '../../config/db.js';

const router = express.Router();

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

// Function to insert a row into the database
async function insertRow(data, table) {

  const keys = Object.keys(data);
  const values = Object.values(data);

  const columns = keys.map((key) => `"${key}"`).join(', ');
  const rows = values.map((_, i) => `$${i + 1}`).join(', ');

  const query = `INSERT INTO ${table} (${columns}) VALUES (${rows})`;

  await pool.query(query, values);
}

// Endpoint to upload csv file.
router.post('/', upload.single('file'), (req, res) => {
  const { file } = req;

  const { table } = req.query;
  if (!table) {
    return res.status(400).send('You must specify the table in the "table" parameter.');
  }

  if (!file) {
    return res.status(400).send('A CSV file has not been uploaded.');
  }

  const filas = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => {
      filas.push(data);
    })
    .on('end', async () => {
      try {
        for (const fila of filas) {
          await insertRow(fila, table);
        }
        console.log('Import Succesful');
        
      } catch (error) {
        console.error('Error al insertar datos:', error);
      } finally {
        // Elimina el archivo cargado después de procesarlo
        fs.unlinkSync(file.path);
      }
    });
});

export default router;
