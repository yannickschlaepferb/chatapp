const express = require('express');
const mariadb = require('mariadb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 

const pool = mariadb.createPool({
  host: 'your_database_host',
  user: 'your_db_user',
  password: 'your_db_password',
  database: 'your_database_name',
});

// Route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const conn = await pool.getConnection();
  try {
    const result = await conn.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
    if (result.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed. Incorrect credentials.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    conn.release();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
