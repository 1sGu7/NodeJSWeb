const { Pool } = require('pg');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Lấy chuỗi kết nối từ biến môi trường
const connectionString = process.env.DATABASE_URL || 'postgresql://root:TNdT7Ds6p8Tog5tHNOcjYe3Y5ICfr5Up@dpg-d10gd463jp1c738ve1h0-a.singapore-postgres.render.com/test_database_r0so';

const pool = new Pool({
  connectionString: connectionString,  // Sử dụng chuỗi kết nối
  ssl: {
    rejectUnauthorized: false,  // Cấu hình SSL nếu Render yêu cầu
  }
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');  // Kiểm tra kết nối với DB
    res.send(`Database connected at ${result.rows[0].now}`);
  } catch (err) {
    console.error('Error connecting to database', err);
    res.status(500).send('Error connecting to database');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
