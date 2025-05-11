const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'postgres',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('🌐 Backend is running!');
});

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.listen(5000, () => {
  console.log('🚀 Backend listening on port 5000');
});
