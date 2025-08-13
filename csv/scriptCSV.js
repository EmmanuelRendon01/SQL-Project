import fs from 'fs';
import csv from 'csv-parser';
import pool from '../config/db.js';

const csvFilePath = './medico.csv';

const tablaDestino = 'medicos';

async function insertarFila(data) {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const columnas = keys.map((key) => `"${key}"`).join(', ');
  const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

  const query = `INSERT INTO ${tablaDestino} (${columnas}) VALUES (${placeholders})`;

  await pool.query(query, values);
}

async function cargarCSV() {
  const filas = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      filas.push(data);
    })
    .on('end', async () => {
      try {
        for (const fila of filas) {
          await insertarFila(fila);
        }
        console.log('Importación completada con éxito.');
      } catch (error) {
        console.error('Error al insertar datos:', error);
      } finally {
      }
    });
}

cargarCSV();